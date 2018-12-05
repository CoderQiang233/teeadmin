
const initstate = {
    loading:false,
    list: [],
}

function securitycodeRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllSecurityListSuccess':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.list.list,
            loading:false
        }
        case 'securitycode/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default securitycodeRedux;