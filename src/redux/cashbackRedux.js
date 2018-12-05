
const initstate = {
    list: [],
    loading: false,
    levelCount: [],
    cashlist: [],
    monthlist:[]
}

function cashbackRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllCashbackListSuccess':
            console.log('redux', payload)
            return {
                ...state,
                list: payload.data.data.list.list,
                pageIndex: payload.data.data.list.pageIndex,
                total: payload.data.data.list.total,
                loading: false
            }
        case 'cashback/loading':
            return {
                ...state,
                loading: true,
            }
        case 'findAllCashbackListMsgSuccess':
            console.log('redux', payload)
            return {
                ...state,
                cashlist: payload.data.data.list.list,
                cashpageIndex: payload.data.data.list.pageIndex,
                cashtotal: payload.data.data.list.total,
                loading: false
            }
        case 'cashbackMsg/loading':
            return {
                ...state,
                loading: true,
            }
        case 'findAllMonthRecordSuccess':
            console.log('redux', payload)
            return {
                ...state,
                monthlist: payload.data.data.list.list,
                monthpageIndex: payload.data.data.list.pageIndex,
                monthtotal: payload.data.data.list.total,
                loading: false
            }
        case 'monthrecord/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default cashbackRedux;