
const initstate = {
  loading:false,
  list: [],
  ware:'',
  levelList:[],
  typeList:[],
}



function goods(state = initstate, { type, payload }) {
  switch (type) {
      case "findAllGoodsSuccess":
          return {
              ...state,
              list: payload.data.data.info.products,
              pageIndex: payload.data.data.info.pageIndex,
              total: payload.data.data.info.total,
              loading:false
          };
      case "goods/loading":
          return {
              ...state,
              loading:true
          };
      case "findGoodsSuccess":
          return {
              ...state,
              ware: payload.data.data.info,
          };
      case "findAllMemberLevelSuccess":
          return {
              ...state,
              levelList: payload.data.data.info,
              loading:false
          };
      case "findAllTypeSuccess":
          return {
              ...state,
              typeList: payload.data.data.info,
              loading:false
          };
      case "findAllGoodSpecificationListSuccess":
          return {
              ...state,
              specificationList: payload.data.goodSpecificationList,
              loading:false
          };
      case "findIdNameSuccess":
          return {
              ...state,
              idNameList: payload.data.idNameList,
              loading:false
          };
      
      default:
          return state
  }



}

export default goods;
