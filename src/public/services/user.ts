import axios, {AxiosResponse} from 'axios';
import {
  LoginPayload,
  AutoLoginPayload,
  ForgetPasswordPayload,
  RegisterPayload,
  ChangePasswordPayload,
} from './models/UserModels';

interface IOkResponse {
  ok: boolean;
  data: AxiosResponse;
}

interface IFailResponse {
  ok: boolean;
  data: any;
}

const okResponse = (res: AxiosResponse): IOkResponse => ({
  ok: true,
  data: res.data,
});

const failResponse = (err: any): IFailResponse => ({
  ok: false,
  data: err,
});

/**
 * @type POST
 * @param {LoginPayload} payload
 * @returns
 */
export const login = (payload: LoginPayload) => {
  return axios
    .post(
      `?rest_route=/simple-jwt-login/v1/auth&email=${payload.email}&password=${payload.password}&AUTH_KEY=THISISMySpeCiaLAUthCode`,
    )
    .then(res => {
      return okResponse(res);
    })
    .catch(err => {
      return failResponse(err);
    });
};

/**
 * @type POST
 * @param {RegisterPayload} payload
 * @returns
 */
export const register = (payload: RegisterPayload) => {
  return axios
    .post(
      `?rest_route=/simple-jwt-login/v1/users&email=${payload.email}&password=${payload.password}&AUTH_KEY=THISISMySpeCiaLAUthCode&user_meta={"yith_birthday": ${payload.user_meta.yith_birthday}}`,
    )
    .then(res => okResponse(res))
    .catch(err => failResponse(err));
};

/**
 * @type GET
 * @param {AutoLoginPayload} payload
 * @returns
 */
export const autoLogin = (payload: AutoLoginPayload) => {
  return axios
    .get(`?rest_route=/simple-jwt-login/v1/autologin&JWT=${payload.jwt}`)
    .then(res => {
      return okResponse(res);
    })
    .catch(err => {
      return failResponse(err);
    });
};

/**
 * @type POST
 * @param {ForgetPasswordPayload} payload
 * @returns
 */
export const forgetPassword = (payload: ForgetPasswordPayload) => {
  return axios
    .post(
      `?rest_route=/simple-jwt-login/v1/user/reset_password&email=${payload.email}&AUTH_KEY=THISISMySpeCiaLAUthCode`,
    )
    .then(res => {
      return okResponse(res);
    })
    .catch(err => {
      return failResponse(err);
    });
};

/**
 * @type POST
 * @param {ChangePasswordPayload} payload
 * @returns
 */
export const changePassword = (payload: ChangePasswordPayload) => {
  return axios
    .put(
      `?rest_route=/simple-jwt-login/v1/user/reset_password&email=${payload.email}&code=${payload.code}&new_password=${payload.new_password}&AUTH_KEY=THISISMySpeCiaLAUthCode`,
    )
    .then(res => okResponse(res))
    .catch(err => failResponse(err));
};
