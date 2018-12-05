import {message} from 'antd';
const initstate = {
    loading:false,
    list: [],
  }
  
  
  
  function ProductBanner(state = initstate, { type, payload }) {
    switch (type) {
        case "findAllProductBannerListSuccess":
            console.log(payload.data.data);
            return {
                ...state,
                list: payload.data.data,
                // pageIndex: payload.data.pageIndex,
                // total: payload.data.total,
                loading:false
            };
        case "ProductBanner/loading":
            return {
                ...state,
                loading:true
            };
        
        default:
            return state
  
  
  }
}
  export default ProductBanner;