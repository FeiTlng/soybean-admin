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
    url: '/v1/role/all',
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

export function addNewUserAccount(param?: Pick<Api.SystemManage.User, 'userName' | 'userPhone' | 'userGender'>) {
  return request({
    method: 'POST',
    url: '/v1/mg/uc/addNew',
    data: {
      userName: param?.userName,
      userPhone: param?.userPhone,
      userGender: param?.userGender
    }
  });
}

export function modifyUserInfo(param?: Pick<Api.SystemManage.User, 'id' | 'userName' | 'userPhone' | 'userGender' | 'status'>) {
  return request({
    method: 'POST',
    url: '/v1/mg/uc/modifyUserInfo',
    data: {
      id: param?.id,
      userName: param?.userName,
      userGender: param?.userGender,
      userPhone: param?.userPhone,
      status: param?.status
    }
  });
}

export function batchDelUserByIds(id?: any[]) {
  return request({
    method: 'POST',
    url: '/v1/mg/uc/batchCloseAccount',
    data: {
      ids: id
    }
  })
}

export function changeUserType(id?: string, type?: number) {
  return request({
    method: 'POST',
    url: '/v1/mg/uc/type/change',
    data: {
      id: id,
      type: type
    }
  });
}

export function getAllManagerUser() {
  return request<Api.SystemManage.User[]>({
    method: 'GET',
    url: '/v1/mg/uc/getAllManager',
  });
}

export function getUserByRole(rid: string) {
  return request<Api.SystemManage.User[]>({
    method: 'GET',
    url: '/v1/mg/uc/listByRole',
    params: {rid: rid}
  })
}

export function changeManageUserRole(roleId: string, param: any[]) {
  return request({
    method: 'POST',
    url: '/v1/role/bind',
    data: {
      roleId: roleId,
      uidS: param
    }
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

export function getAllPermit() {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.PermissionInfo>>({
    url: '/v1/permission/list',
    method: 'GET'
  });
}

export function getPermitsByRole(rid: string) {
  return request<Api.SystemManage.RolePermissionInfo>({
    url: '/v1/permission/listByRole',
    method: 'GET',
    params: {rid: rid}
  });
}
