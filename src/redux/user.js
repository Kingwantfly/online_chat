import axios from "axios";
import { getRedirectPath } from '../util';

// acction type
const ERROR_MSG = "ERROR_MS";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOGOUT = "LOGOUT";

const initState = {
  redirectTo: "",  //跳转地址
  msg: "",  //失败时存储返回的msg
  user: "", //用户名称
  type: ""  //用户类型 boss或eagle
}
// reducer
export function user(state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: "", redirectTo: getRedirectPath(action.payload), ...action.payload } 
    case ERROR_MSG:  
      return { ...state, msg: action.msg, isLogin: false }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case LOGOUT:
      return { ...initState, redirectTo: "/login" }
    default:
      return state;
  }
}

function errorMsg(msg) {
  return { type: ERROR_MSG, msg: msg}
}
function authSuccess(obj) {
  // 过滤pwd
  const { pwd, ...data} = obj;
  return { type: AUTH_SUCCESS, payload: data}
}

export function loadData (userInfo) {
  return { type: LOAD_DATA, payload: userInfo }
}

export function logoutSubmit () {
  return { type: LOGOUT }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg("用户名，密码必须输入")
  }
  return dispatch => {
    axios.post("/user/login", {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({user, pwd, checkpwd, type}) {
  if (!user || !pwd) {
    return errorMsg("用户名，密码必须输入")
  }
  if (pwd !== checkpwd) {
    return errorMsg("两次输入密码不同")
  }
  return dispatch => {
    axios.post("/user/register", {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post("/user/update", data)
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}



