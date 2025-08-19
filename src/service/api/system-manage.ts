import { request } from '../request';

export function addNewRole(params?: any) {
  return request<any>({
    method: 'POST',
    url: '/v1/role/add',
    data: params
  });
}

export function delRoleById(id?: any[]) {
  return request({
    method: 'POST',
    url: '/v1/role/del',
    data: {
      ids: id
    }
  })
}

export function modifyRole(params: Api.SystemManage.Role | any) {
  return request({
    method: 'POST',
    url: '/v1/role/modify',
    data: {
      id: params.id,
      name: params.roleName,
      status: params.status
    }
  });
}

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/v1/role/list',
    method: 'get',
    params,
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/systemManage/getAllRoles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/v1/mg/uc/list',
    method: 'get',
    params
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/systemManage/getMenuList/v2',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/systemManage/getMenuTree',
    method: 'get'
  });
}
