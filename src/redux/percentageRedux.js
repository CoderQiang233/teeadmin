
const initstate = {
    list: [],
    loading:false,
    levelCount: [],
}

function percentageRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'findAllpercentageListSuccess':
        console.log('redux',payload)
        return {
            ...state,
            list: payload.data.data.info,
            loading:false
        }
        case 'percentage/loading':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }

}

export default percentageRedux;