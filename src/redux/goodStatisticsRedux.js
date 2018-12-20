
const initstate = {
    list: [],
    loading:false,
    levelCount: [],
}

function goodStatisticsRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findgoodStatisticsList':
        return {
            ...state,
            list: payload.data.data.info,
            loading:false
        }
        case 'goodStatistics/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default goodStatisticsRedux;