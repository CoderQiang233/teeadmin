const initstate = {
    loading: false,
    list: [],
    order:[]
}

function productOrder(state = initstate, { type, payload }) {
    switch (type) {
        case "findAllProductOrderSuccess":
            return {
                ...state,
                list: payload.data.data.info.orderAll,
                pageIndex: payload.data.data.info.pageIndex,
                total: payload.data.data.info.total,
                loading: false
            };
        case "productOrder/loading":
            return {
                ...state,
                loading: true
            };
        case "findProductOrderByIdSuccess":
            return {
                ...state,
                order: payload.data.data.info,
            };
        default:
            return state
    }
}

export default productOrder;
