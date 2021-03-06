const initstate = {
    list: [],
    currentUser: {},
}


function user(state = initstate,{type,payload}){

    switch(type){
        case "currentUser":
            return {
                ...state
            }
        case "saveCurrentUser":
            return {
                ...state,
                currentUser:payload.user
            }
        case 'changeNotifyCount':
        return {
            ...state,
            currentUser: {
              ...state.currentUser,
              notifyCount: payload,
            },
          };
        default:
            return state
    }




}

export default user;