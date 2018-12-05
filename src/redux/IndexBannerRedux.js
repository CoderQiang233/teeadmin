import {message} from 'antd';
const initstate = {
    loading:false,
    list: [],
  }
  
  
  
  function indexBanner(state = initstate, { type, payload }) {
    switch (type) {
        case "findAllIndexBannerListSuccess":
            console.log(payload.data.data);
            return {
                ...state,
                list: payload.data.data,
                // pageIndex: payload.data.pageIndex,
                // total: payload.data.total,
                loading:false
            };
        case "IndexBanner/loading":
            return {
                ...state,
                loading:true
            };
        
        default:
            return state
  
  
  }
}
  export default indexBanner;