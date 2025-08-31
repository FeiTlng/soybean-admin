import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '0': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  '1': 'page.manage.user.gender.male',
  '2': 'page.manage.user.gender.female'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const userStatus: Record<Api.SystemManage.UserStatus, App.I18n.I18nKey> = {
  '0': 'page.manage.user.status.enable',
  '1': 'page.manage.user.status.disable',
  '2': 'page.manage.user.status.invalidPhone'
}

export const userStatusOptions = transformRecordToOption(userStatus);


export const userTypeRecord: Record<Api.SystemManage.UserType,App.I18n.I18nKey> = {
  1: 'page.manage.user.type.normal',
  2: 'page.manage.user.type.manager'

};
export const userTypeOptions =transformRecordToOption(userTypeRecord);

export const userTypeSetUpBut: Record<Api.SystemManage.UserType, App.I18n.I18nKey> = {
  2: 'page.manage.user.setUpNormal',
  1: 'page.manage.user.setUpManage',
};
export const userTypeSetUpButOptions = transformRecordToOption(userTypeSetUpBut);


export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.type.directory',
  '2': 'page.manage.menu.type.menu'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.iconType.iconify',
  '2': 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);
