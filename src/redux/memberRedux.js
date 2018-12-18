
const initstate = {
    list: [],
    loading:false,
    levelCount: [],
}

function memberRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllMemberSuccess':
        return {
            ...state,
            list: payload.data.data.info.members,
            pageIndex: payload.data.data.info.pageIndex,
            total: payload.data.data.info.total,
            loading:false
        }
        case 'member/loading':
            return {
                ...state,
                loading: true,
            }
        case 'findCountByMemberLecelSuccess':
            return {
                ...state,
                levelCount: payload.data.data.list,
            }
        default:
            return state
    }

}

export default memberRedux;