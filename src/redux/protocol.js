
const initstate = {
    loading: false,
    list: [],
}



function protocol(state = initstate, { type, payload }) {

    switch (type) {
        case "":
            return {
                ...state,
            };
        case "protocol/loading":
            return {
                ...state,
                loading: true
            };
        case "protocol/getListSuccess":
            return {
                ...state,
                list:payload,
                loading: false,
            };
        default:
            return state
    }

}

export default protocol;