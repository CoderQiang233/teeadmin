
const initstate = {
    loading: false,
    list: [],
    treeList:[],
    singInStaffList:[]
}



function meeting(state = initstate, { type, payload }) {

    switch (type) {
        case "":
            return {
                ...state,
            };
        case "meeting/loading":
            return {
                ...state,
                loading: true
            };
        case "meeting/getListSuccess":
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case "meeting/getTreeSuccess":
            return {
                ...state,
                treeList:payload,
                loading:false,
            };
            case "meeting/getSinInStaffSuccess":
            return {
                ...state,
                singInStaffList:payload.list,
            };    
        default:
            return state
    }

}

export default meeting;