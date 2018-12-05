'use strict';

const  initstate = {
    userList: [],
    departments:[]
  }

function staff(state = initstate, {type,payload}){

    switch(type){
        case 'user/showLoading':
        return {
            ...state,
            loading: true,
        }   
        case 'user/closeLoading':
        return {
            ...state,
            loading: false,
        } 
        case 'user/getListSuccess':
        console.log('用户:',payload)
            return {
                ...state,
                userList: payload.list,
            }
        case 'user/addUserSuccess':
        return {
            ...state,
            userList: payload.list,
        } 
        case 'user/getDepartmentsSuccess':
        return {
            ...state,
            departments: payload.list,
        }     
        default:
        return state
    }

}

export default staff;