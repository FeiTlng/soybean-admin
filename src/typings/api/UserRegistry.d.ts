declare namespace Api{
  namespace Registry {
    interface RegistryInfoPwd {
      type: number,
      agreePrivacy: boolean,
      nickName: string,
      pwd: string,
      registryPhone: {
        phone: string,
        code: string,
      }
    }
  }
}
