
const initstate = {
    loading:false,
    list: [],
}

function profileRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllCompanyListSuccess':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.info.list,
            pageIndex: payload.data.data.info.pageIndex,
            total: payload.data.data.info.total,
            loading:false
        }
        case 'profile/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default profileRedux;