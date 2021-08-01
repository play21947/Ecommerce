import Axios from 'axios'
import Swal from 'sweetalert2'

const AuthStart=()=>{
    return{
        type: 'AUTH_START'
    }
}

const AuthReceive=(data)=>{
    return{
        type: 'AUTH_RECEIVE',
        payload: data
    }
}

const AuthError=()=>{
    return{
        type: 'AUTH_ERROR'
    }
}

export const AsyncAuth=(username, password, cb)=>{
    return (dispatch)=>{
        dispatch(AuthStart())
        return Axios.post("http://play2lover.ddns.net:3001/CheckAuth", {
            username: username,
            password: password
        }).then((res)=>{
            setTimeout(()=>{
                if(res.data){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เข้าสู่ระบบสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    dispatch(AuthReceive(res.data))
                    setTimeout(()=>{
                        localStorage.setItem('user', res.data[0].username)
                        cb()
                    }, 1700)
                }
                else{
                    console.log("Hook")
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ไอดีหรือรหัสผ่านผิด',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(AuthError())
                }
            }, 2000)
        }).catch((err)=>{
            console.log("here")
            if(err) {
                dispatch(AuthError())
            }
        })
    }
}