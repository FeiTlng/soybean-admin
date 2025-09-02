<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import { changeManageUserRole, fetchGetMenuTree, fetchGetUserList } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'UserRoleModal'
});

interface Props {
  /** the roleId */
  roleId: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('page.manage.role.setUp.modalTitle'));

const home = shallowRef('');

async function getHome() {
  console.log('getHome')

  home.value = 'home';
}

async function updateHome(val: string) {
  // request

  home.value = val;
}

const pages = computed(()=> shallowRef<Api.SystemManage.User[]>([])) ;

async function getPages() {
  const { error, data } = await fetchGetUserList({type: 2, status: '0'});
  if (!error) {
    pages.value.value = data?.data;
  }
}

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree();

  if (!error) {
    tree.value = data;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  // console.log(props.roleId);
  // request
  checks.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
}

function handleSubmit() {
  console.log(checks.value, props.roleId);
  // request
  changeManageUserRole(props.roleId, checks.value).then(res=>{
    if (res.response.status===200) {
      window.$message?.success?.($t('common.modifySuccess'));
      closeModal();
    }
  })
}

function init() {
  getHome();
  getPages();
  // getTree();
  // getChecks();
}

const createOptions = computed(()=>{
  return pages.value.value.map((v,i)=>{
    return {
      label: v.userName,
      value: v.id
    }
  })
})

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-70rem">
    <NTransfer v-model:value="checks" :options="createOptions" source-filterable target-filterable
               virtual-scroll ></NTransfer>
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
