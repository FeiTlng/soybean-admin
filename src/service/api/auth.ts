import { request } from '../request';
import any from 'async-validator/dist-types/validator/any';

/**
 * Login
 *
 * @param phone User name
 * @param password Password
 * @param type login type
 */
export function fetchLogin(phone: string, password: string, type: number) {
  return request<Api.Auth.LoginToken>({
    // url: '/auth/login',
    url: '/v1/mg/uc/login',
    method: 'post',
    data: {
      phone,
      password,
      type
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/v1/uc/info' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
