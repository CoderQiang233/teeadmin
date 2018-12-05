
const initstate = {
    list: [],
    loading:false,
    levelCount: [],
}

function memberRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllMemberSuccess':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.list.list,
            pageIndex: payload.data.data.list.pageIndex,
            total: payload.data.data.list.total,
            loading:false
        }
        case 'member/loading':
            return {
                ...state,
                loading: true,
            }
            case 'findCountByMemberLecelSuccess':
            console.log('reduxCount',payload)
            return {
                ...state,
                levelCount: payload.data.data.list,
            }
        default:
            return state
    }

}

export default memberRedux;