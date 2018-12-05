'use strict';

const  initstate = {
    staffList: [],
    departments:[]
  }

function staff(state = initstate, {type,payload}){

    switch(type){
        case 'staff/showLoading':
        return {
            ...state,
            loading: true,
        }   
        case 'staff/closeLoading':
        return {
            ...state,
            loading: false,
        } 
        case 'staff/getListSuccess':
            return {
                ...state,
                staffList: payload.list,
            }
        case 'staff/addStaffSuccess':
        return {
            ...state,
            staffList: payload.list,
        } 
        case 'staff/getDepartmentsSuccess':
        return {
            ...state,
            departments: payload.list,
        }     
        default:
        return state
    }

}

export default staff;