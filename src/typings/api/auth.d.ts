declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      uid: string;
      userName: string;
      gender: string,
      roles: [{
        rid: string,
        name: string
      }];
      buttons: string[];
    }
  }
}
