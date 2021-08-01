import Axios from "axios"
import Swal from "sweetalert2"

export let RegisterStart=()=>{
    return{
        type: 'REGISTER_START'
    }
}

export let RegisterReceive=()=>{
    return{
        type: 'REGISTER_RECEIVE',
    }
}

export let RegisterError=()=>{
    return{
        type: 'REGISTER_ERROR'
    }
}

export let AsyncRegister=(username, password, email)=>{
    return(dispatch)=>{
        dispatch(RegisterStart())
        return Axios.post("http://play2lover.ddns.net:3001/register",{
            username: username,
            password: password,
            email: email
        }).then((res)=>{
            console.log(res.data)
            setTimeout(()=>{
                if(res.data.AlreadyId){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'มีบัญชีนี้อยู่แล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(RegisterError())
                }else{
                    console.log("Work")
                    if(res.data.SuccessRegister){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'สมัครบัญชีเสร็จสิ้น',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        dispatch(RegisterReceive())
                        setTimeout(() => {
                            window.location.href = "http://play2lover.ddns.net:3000/login"
                        }, 1700);
                    }
                }
            }, 2000)
        }).catch((err)=>{
            if(err){
                dispatch(RegisterError())
            }
        })
    }
}