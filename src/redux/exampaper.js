
const initstate = {
    loading: false,
    list: [],
}



function exampaper(state = initstate, { type, payload }) {

    switch (type) {
        case "":
            return {
                ...state,
            };
        case "exampaper/loading":
            return {
                ...state,
                loading: true
            };
        case "exampaper/closeLoading":
            return {
                ...state,
                loading: false
            };
        case "exampaper/getListSuccess":
            return {
                ...state,
                list:payload,
                loading: false,
            };
        default:
            return state
    }

}

export default exampaper;