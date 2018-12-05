const initstate = {
    loading: false,
    orderNum:0,
    totalPrice:0,
    userNum:0,
    orderNewest:[]
}

function productOrderCount(state = initstate, { type, payload }) {
    switch (type) {
        case "findAllProductOrderCountSuccess":
            return {
                ...state,
                orderNum: payload.data.data.info.orderNum,
                totalPrice: payload.data.data.info.totalPrice,
                userNum: payload.data.data.info.userNum,
                loading: false
            };
        case "productOrderCount/loading":
            return {
                ...state,
                loading: true
            };
        case "findProductOrderNewestSuccess":
            return {
                ...state,
                orderNewest: payload.data.data.info,
                loading: false
            };
        default:
            return state
    }
}

export default productOrderCount;
