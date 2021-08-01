import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { AsyncRegister } from "../actions/RegisterActions"

const Register=()=>{


    let dispatch = useDispatch()
    let register = useSelector(state => state.register)

    let getUsername
    let getPassword
    let getConfirmPassword
    let getEmail

    console.log(register)

    let HandleForm=(e)=>{
        e.preventDefault()

        let username = getUsername.value
        let password = getPassword.value
        let confirmPassword = getConfirmPassword.value
        let email = getEmail.value

        if(!username || !password || !confirmPassword || !email){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            if(password !== confirmPassword){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'รหัสผ่านไม่ตรงกัน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                dispatch(AsyncRegister(username, password, email))
            }
        }
    }

    return(
        <div className="register">
            <form onSubmit={HandleForm}>
                <h1>สมัครสมาชิก</h1>
                <input ref={(username) => getUsername = username} placeholder="บัญชีผู้ใช้"></input><br/>
                <div className="grid-register">
                    <input ref={(password => getPassword = password)} type="password" placeholder="รหัสผ่าน"></input><br/>
                    <input ref={(confirmPassword => getConfirmPassword = confirmPassword)} type="password" placeholder="ยืนยันรหัสผ่าน"></input><br/>
                </div>
                <input ref={(email) => getEmail = email} type="email" placeholder="อีเมลล์"></input><br/>
                {register.isLoadding ? <button disabled>กำลังสมัครสมาชิก...</button> : <button>สมัครสมาชิก</button>}
            </form>
        </div>
    )
}

export default Register