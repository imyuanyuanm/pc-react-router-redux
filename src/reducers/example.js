/* eslint-disable */
import cFetch from './../utils/cFetch';
import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  GET_USER_DATA_PENDING,
  GET_USER_DATA_FULFILLED,
  GET_USER_DATA_REJECTED,
  SAVE_USER_DATA,
} from './../constants/actionTypes.js';

import API_CONFIG from '../config/api';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return {
        ...state,
        loginData: action.payload
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };
    default:
      return state;
  }
}

// 登录
export function login(params) {
  const formData = `data=${JSON.stringify(params)}`;    // post请求使用formData
  return {
    type: [LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED],
    payload: cFetch(API_CONFIG.LOGIN, {
      method: 'POST', body: formData
    })
  };
}

// 获取用户信息
export function getUserData(params) {
  return {
    type: [GET_USER_DATA_PENDING, GET_USER_DATA_FULFILLED, GET_USER_DATA_REJECTED],
    payload: cFetch(API_CONFIG.GET_PAPER_LIST, { method: 'GET', params })
  };
}


// 保存用户信息
export function saveUserData(params) {
  return {
    type: SAVE_USER_DATA,
    userData: params
  };
}
