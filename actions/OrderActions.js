import axios from "axios"

export let StartGetOrder=()=>{
    return{
        type: "START_GET_ORDER"
    }
}

export let ReceiveGetOrder=(data)=>{
    return{
        type: "RECEIVE_GET_ORDER",
        payload: data
    }
}

export let ErrorGetOrder=()=>{
    return{
        type: "ERROR_GET_ORDER"
    }
}

export let AsnycGetOrder=()=>{
    return (dispatch)=>{
        dispatch(StartGetOrder())
        axios.get("http://play2lover.ddns.net:3001/order").then((res)=>{
            dispatch(ReceiveGetOrder(res.data))
        }).catch((err)=>{
            if(err){
                dispatch(ErrorGetOrder())
            }
        })
    }
}