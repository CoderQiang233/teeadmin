
const initstate = {
    list: [],
    loading:false,
    levelCount: [],
}

function orderStatisticsRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findorderStatisticsList':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.info,
            loading:false
        }
        case 'orderStatistics/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default orderStatisticsRedux;