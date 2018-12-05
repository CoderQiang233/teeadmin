'use strict';

const  initstate = {
    statisticsList: [],
    departments:[],
    signList:[]
  }

function statistics(state = initstate, {type,payload}){

    switch(type){
        case 'statistics/showLoading':
        return {
            ...state,
            loading: true,
        }   
        case 'statistics/closeLoading':
        return {
            ...state,
            loading: false,
        } 
        case 'statistics/getListSuccess':
            return {
                ...state,
                statisticsList: payload.list,
            }
        case 'statistics/getDepartmentsSuccess':
        return {
            ...state,
            departments: payload.list,
        } 
        case 'statistics/getSignInStaffSuccess':
        return {
            ...state,
            signList: payload.list,
        }     
        default:
        return state
    }

}

export default statistics;