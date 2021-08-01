let initialState = {
    Order: [],
    isLoadding: false,
    isError: false
}


let OrderReducer=(state = initialState, action)=>{
    if(action.type === "START_GET_ORDER"){
        return{
            isLoadding: true,
            isError: false,
            Order: []
        }
    }
    else if(action.type === "RECEIVE_GET_ORDER"){
        return{
            Order: action.payload,
            isLoadding: false,
            isError: false
        }
    }
    else if(action.type === "ERROR_GET_ORDER"){
        return{
            isError: true,
            isLoadding: false
        }
    }
    else{
        return state
    }
}

export default OrderReducer