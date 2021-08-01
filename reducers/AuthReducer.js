let initialState = {
    DataUser: {},
    isLoadding: false,
    isError: false
}

let AuthReducer = (state = initialState, action) =>{
    if(action.type === "AUTH_START"){
        return{
            isLoadding: true,
            isError: false
        }
    }
    else if(action.type === "AUTH_RECEIVE"){
        return{
            DataUser: action.payload,
            isLoadding: false,
            isError: false
        }
    }
    else if(action.type === "AUTH_ERROR"){
        return{
            isError: true,
            isLoadding: false
        }
    }
    else{
        return state
    }
}

export default AuthReducer