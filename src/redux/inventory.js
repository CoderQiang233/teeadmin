
const initstate = {
  loading:false,
  recordTotal: [],
  agentInventory:[],
  recordAgentProduct:[],
}



function inventory(state = initstate, { type, payload }) {
  switch (type) {
      case "findAllTInventoryItemSuccess":
          return {
              ...state,
              recordTotal: payload.data.data.info.recordTotal,
              pageIndex: payload.data.data.info.pageIndex,
              total: payload.data.data.info.total,
              loading:false
          };
        case "findAllAgentInventorySuccess":
          return {
              ...state,
              agentInventory: payload.data.data.info.agentInventory,
              pageIndexAgent: payload.data.data.info.pageIndex,
              totalAgent: payload.data.data.info.total,
              loading:false
          };
        case "findAgentProductInventorySuccess":
          return {
              ...state,
              recordAgentProduct: payload.data.data.info.recordAgentProduct,
              pageIndexAgentProduct: payload.data.data.info.pageIndex,
              totalAgentProduct: payload.data.data.info.total,
              loading:false
          };
      case "inventory/loading":
          return {
              ...state,
              loading:true
          };     
      default:
          return state
  }

}

export default inventory;
