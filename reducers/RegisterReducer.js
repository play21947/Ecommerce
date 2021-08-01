let initialState = {
    isLoadding: false,
    isError: false
}

let RegisterReducer=(state = initialState, action)=>{
    if(action.type === "REGISTER_START"){
        return{
            isLoadding: true,
            isError: false
        }
    }
    else if(action.type === "REGISTER_RECEIVE"){
        return{
            isLoadding: false,
            isError: false
        }
    }
    else if(action.type === "REGISTER_ERROR"){
        return{
            isError: true,
            isLoadding: false
        }
    }
    else{
        return state
    }
}

export default RegisterReducer