'use strict';
import { setAuthority,setToken,setRole, setUserName,setUserId,setName } from '../utils/authority';
const initstate={

 status:undefined,
 submitting:false,

}

function commonlogin(state,type,payload){

  setRole(payload.role);
  setUserName(payload.userName);
  setToken(payload.userName);
  setAuthority(payload.role);
  setUserId(payload.userId);
  setName(payload.name);
  return {
    ...state,
    status:payload.status,
    type:payload.type,
    submitting:payload.status == 'error'?false:true,
  }

}


function login(state = initstate, {type,payload}) {
    
    switch (type) {
      case 'commonlogin':
        return commonlogin(state,type,payload)
      case 'tologin':
        return {
          ...state,
        status:payload.status,
        type:payload.type,
        submitting:false,

        }
      case 'mobilelogin':

        return state
      case 'loading':
      return {
        ...initstate,
        submitting:true
      }
      default:
        return state
    }
  }

export default login;