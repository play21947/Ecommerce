import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { AsyncAuth } from "../actions/AuthActions"
import { useHistory } from "react-router-dom"

const Login = () => {

    let [HidePass, setHidePass] = useState(true)
    let status = ''
    let eye = ''

    let history = useHistory()

    if (HidePass) {
        status = "password"
        eye = "https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Eye-Show-View-Watch-See-Disable-Inactive-Unavailable-Off-256.png"
    }
    else {
        status = ''
        eye = "https://image.flaticon.com/icons/png/512/159/159604.png"
    }

    let getUsername
    let getPassword

    let dispatch = useDispatch()

    let auth = useSelector(state => state.auth)

    let HandleForm = (e) => {
        e.preventDefault()

        let username = getUsername.value
        let password = getPassword.value

        if (!username || !password) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกข้อมูล',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            dispatch(AsyncAuth(username, password, ()=>{
                history.push('/display_product')
            }))
        }

    }

    console.log(auth)

    return (
        <div className="login">
            <form onSubmit={HandleForm}>
                <h1>เข้าสู่ระบบ</h1>
                <input ref={(username) => getUsername = username} placeholder="บัญชีผู้ใช้"></input><br />
                <input ref={(password) => getPassword = password} type={status} placeholder="รหัสผ่าน"></input><img onClick={() => {
                    if (HidePass) {
                        setHidePass(false)
                    }
                    else {
                        setHidePass(true)
                    }
                }} className="hide" src={eye}></img><br />
                {auth.isLoadding ? <button disabled>กำลังเข้าสู่ระบบ...</button> : <button>เข้าสู่ระบบ</button>}
            </form>
        </div>
    )
}

export default Login