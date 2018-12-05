
const initstate = {
    loading: false,
    list: [],
}



function meetingRoom(state = initstate, { type, payload }) {

    switch (type) {
        case "":
            return {
                ...state,
            };
        case "meetingRoom/loading":
            return {
                ...state,
                loading: true
            };
        case "meetingRoom/getListSuccess":
            return {
                ...state,
                list:payload,
                loading: false,
            };
        default:
            return state
    }



}

export default meetingRoom;