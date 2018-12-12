
const initstate = {
    loading:false,
    list: [],
    moduleList:[],
    productOption:[]
}

function indexLayoutRedux(state = initstate, { type, payload }) {

    switch (type) {
        case 'indexLayout/getModuleListSuccess':
        console.log('redux',payload)
        return {
            ...state,
            moduleList: payload.data.data.info,
            loading:false
        }
        case 'indexLayout/addIndexModuleSuccess':
        return {
            ...state,
            list: payload.data.data.info.list,
            pageIndex: payload.data.data.info.pageIndex,
            total: payload.data.data.info.total,
            loading:false
        }
        case 'indexLayout/editIndexModuleSuccess':
        return {
            ...state,
            list: payload.data.data.info,
        }
        case 'indexLayout/getProductOptionSuccess':
        return {
            ...state,
            productOption: payload.data.data.info,
            loading:false
        }
        case 'indexLayout/loading':
            return {
                ...state,
                loading: true,
            }
            case 'indexLayout/closeLoading':
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }

}

export default indexLayoutRedux;