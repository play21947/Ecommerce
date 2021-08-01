let initialState = {
    product: [],
    isLoadding: false,
    isError: false
}

const ProductReducer=(state = initialState, action)=>{
    if(action.type === "START_PRODUCT"){
        return{
            isLoadding: true,
            isError: false
        }
    }
    else if(action.type === "RECEIVE_PRODUCT"){
        return{
            product: action.payload,
            isError: false,
            isLoadding: false
        }
    }
    else if(action.type === "ERROR_PRODUCT"){
        return{
            isError: true,
            isLoadding: false
        }
    }
    else{
        return state
    }
}

export default ProductReducer