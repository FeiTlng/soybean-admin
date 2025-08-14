import { request } from '../request'



export function userRegistryByPwd(registryInfo: Api.Registry.RegistryInfoPwd) {
  return request<void>({
    url: '/v1/uc/registry',
    method: 'POST',
    data: registryInfo
  });
}

/** send user registry sms code*/
export function sendRegistrySmsCode(phone: string) {
  return request({
    url: '/v1/sms/userRegistry/sendCode',
    method: 'POST',
    data: {
      phone: phone
    }
  });
}
