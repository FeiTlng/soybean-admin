<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import {
  userGenderRecord,
  userStatus,
  userTypeRecord, userTypeSetUpBut
} from '@/constants/business';
import { batchDelUserByIds, changeUserType, fetchGetUserList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';
import { formatUserRegistryTime } from '@/utils/common';

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetUserList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    userName: null,
    userGender: null,
    userPhone: null,
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 'auto',
      render: row => {
        const setUpLabel = $t(userTypeSetUpBut[row.type]);
        const tagMap: Record<Api.SystemManage.UserType, NaiveUI.ThemeColor> = {
          2: 'primary',
          1: 'error'
        };
        return <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
          <NPopconfirm onPositiveClick={() => {
            handleUserTypeChange(row.id, row.type===2?1:2)
          }}>
            {{
              default: () => $t('common.confirmModify'),
              trigger: () => (
                <NButton type={tagMap[row.type]} ghost size="small">
                  {setUpLabel}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>;
      }
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 48
    },
    {
      key: 'userName',
      title: $t('page.manage.user.userName'),
      align: 'center',
      width: 100
    },
    {
      key: 'type',
      title: $t('page.manage.user.userType'),
      align: 'center',
      width: 100,
      render: row => {
        const tagMap: Record<Api.SystemManage.UserType, NaiveUI.ThemeColor> = {
          1: 'primary',
          2: 'error'
        };
        const label = $t(userTypeRecord[row.type]);
        return <NTag type={tagMap[row.type]}>{label}</NTag>;
      }
    },
    {
      key: 'userGender',
      title: $t('page.manage.user.userGender'),
      align: 'center',
      width: 64,
      render: row => {
        const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
          1: 'primary',
          2: 'error'
        };
        if (row.userGender !== '1' && row.userGender!=='2') {
          return <NTag type="default">未知</NTag>;
        } else {
          const label = row.userGender? $t(userGenderRecord[row.userGender]) : '未知';
          return <NTag type={tagMap[row.userGender]}>{label}</NTag>;
        }
      }
    },
    {
      key: 'userPhone',
      title: $t('page.manage.user.userPhone'),
      align: 'center',
      width: 100
    },
    {
      key: 'level',
      title: $t('page.manage.user.userLevel'),
      align: 'center',
      width: 100
    },
    {
      key: 'points',
      title: $t('page.manage.user.userPoints'),
      align: 'center',
      width: 100
    },
    {
      key: 'status',
      title: $t('page.manage.user.userStatus'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.SystemManage.UserStatus, NaiveUI.ThemeColor> = {
          0: 'success',
          2: 'warning',
          1: 'error'
        };

        const label = $t(userStatus[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'createTime',
      title: $t('page.manage.user.registryTime'),
      align: 'center',
      maxWidth: 200,
      render: row => {
        return formatUserRegistryTime(row.createTime);
      }
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
  onSetUp
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  await batchDelUserByIds(checkedRowKeys.value).then(res=>{
    if (res.response.status===200) {
      onBatchDeleted();
    }
  });
}

async function handleDelete(id: number) {
  await batchDelUserByIds([id]).then(res=>{
    if (res.response.status===200) {
      onDeleted();
    }
  });
}

async function handleUserTypeChange(id: any, type: number) {
  await changeUserType(id, type).then(res=>{
    if (res.response.status===200) {
      onSetUp();
    }
  });
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
