<script setup lang="ts">
import { computed, h, ref, shallowRef, watch } from 'vue';
import {
  changeManageUserRole,
  fetchGetMenuTree,
  getAllManagerUser,
  getUserByRole
} from '@/service/api';
import { $t } from '@/locales';
import { NAvatar, NTag, NText } from 'naive-ui';
import type { SelectRenderTag } from 'naive-ui';

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

  home.value = 'home';
}

async function updateHome(val: string) {
  // request

  home.value = val;
}

const pages = computed(()=> shallowRef<Api.SystemManage.User[]>([])) ;

async function getPages() {
  const { error, data } = await getAllManagerUser();
  if (!error) {
    pages.value.value = data;
  }
}

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree();

  if (!error) {
    tree.value = data;
  }
}

const checks = ref<string[]>([]);

async function getChecks() {
  checks.value=[];
  const {error, data} = await getUserByRole(props.roleId)
  if (!error) {
    data?.map((v,i)=>{
      checks.value.push(v.id)
    })
  }
}

function handleSubmit() {
  console.log('check', checks.value)
  // request
  changeManageUserRole(props.roleId, checks.value).then(res=>{
    if (res.response.data.code==='0') {
      window.$message?.success?.($t('common.modifySuccess'));
      closeModal();
    }
  })
}

function init() {
  getHome();
  getPages();
  // getTree();
  getChecks();
}

const selectOptions = computed(()=>{
  return pages.value.value.map((v,i)=>{
    return {
      label: v.userName,
      value: v.id
    }
  })
})

const renderLabel = function(option:any){
  return h('div',{
    style:{
      display: 'flex',
      alignItems: 'center'
    }
  },[
    h(NAvatar,{
      src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      round: true,
      size: 'small'
    }),
    h('div',{
      style:{
        marginLeft: '12px',
        padding: '4px 0'
      }
    },[
      h('div', null, [option.label as string]),
      h(NText,{depth: 3,tag: 'div'},{default:()=>'description'})
      ]),
  ])
}

const renderMulSelectTag: SelectRenderTag = ({option,handleClose})=>{
  return h(
    NTag,
    {
      style: {
        padding: '0 6px 0 4px'
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation()
        handleClose()
      }
    },
    {
      default: () =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          [
            h(NAvatar, {
              src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
              round: true,
              size: 22,
              style: {
                marginRight: '4px'
              }
            }),
            option.label as string
          ]
        )
    }
  )
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-60rem h-20rem">
    <NSelect v-model:value="checks" :options="selectOptions" :render-label="renderLabel" :render-tag="renderMulSelectTag"
             multiple filterable clearable :clear-filter-after-select="false" />
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
