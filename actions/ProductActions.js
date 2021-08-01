import Axios from "axios"

const StartProduct=()=>{
    return{
        type: "START_PRODUCT"
    }
}

const ReceiveProduct=(data)=>{
    return{
        type: "RECEIVE_PRODUCT",
        payload: data
    }
}

const ErrorProduct=()=>{
    return{
        type: "ERROR_PRODUCT"
    }
}

export let AsnycProduct=()=>{
    return (dispatch)=>{
        dispatch(StartProduct())
        return Axios.get("http://play2lover.ddns.net:3001/product").then((res)=>{
            dispatch(ReceiveProduct(res.data))
        }).catch((err)=>{
            if(err){
                dispatch(ErrorProduct())
            }
        })
    }
}