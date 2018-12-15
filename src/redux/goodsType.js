
const initstate = {
  loading:false,
  list: [],
  typeSelect:[],
}



function goodsType(state = initstate, { type, payload }) {
  switch (type) {
      case "findAllGoodsTypeSuccess":
          return {
              ...state,
              list: payload.data.data.info,
              loading:false
          };
      case "goodsType/loading":
          return {
              ...state,
              loading:true
          };
      case "findGoodsTypeSuccess":
          return {
              ...state,
              goodsType: payload.data.goodsType,
          };
      case "findTypeSelectSuccess":
          return {
              ...state,
              typeSelect:payload.data.data.info,
          }
      default:
          return state
  }



}

export default goodsType;
