
const initstate = {
    loading:false,
    list: [],
}

function newsRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllNewsListSuccess':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.info.list,
            pageIndex: payload.data.data.info.pageIndex,
            total: payload.data.data.info.total,
            loading:false
        }
        case 'news/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default newsRedux;