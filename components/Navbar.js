import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'

import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { ResetCart } from '../actions/CartActions'

const Navbar = () => {

    let history = useHistory()

    let dispatch = useDispatch()

    let user = localStorage.getItem('user')
    let cart = useSelector(state => state.cart)

    let TotalCart = cart.cart.reduce((sum, item)=> sum + item.quantity, 0)


    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 1000,
            easing: 'ease-in-sine'
        });
    }, [])

    let [status, setStatus] = useState(false)

    let change = () => {
        setStatus(false)
    }

    let quit = (cb) => {
        Swal.fire({
            title: 'ต้องการออกจากระบบ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ออกจากระบบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ออกจากระบบ',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(()=>{
                    localStorage.removeItem('user')
                    history.push('/')
                    dispatch(ResetCart())
                    cb()
                }, 2000)
            }
        })
    }

    return (
        <div className="nav">
            <div className="logo">
                {!user ? <h1><Link onClick={change} className="link-logo" to="/">MICRO</Link></h1> : <h1><Link onClick={change} className="link-logo" to="/display_product">MICRO</Link></h1>}
            </div>
            {status ?
                <ul className="menu ul-show">
                    {user ? <Link onClick={change} className="link" to="/display_product"><li data-aos="fade-up">{user}</li></Link> : <Link onClick={change} className="link" to="/login"><li data-aos="fade-up">เข้าสู่ระบบ</li></Link>}
                    {user ? <Link onClick={change} className="link" to="/order"><li onClick={change} data-aos="fade-up">ออเดอร์</li></Link> : null}
                    {user ? null : <Link onClick={change} className="link" to="/register"><li onClick={change} data-aos="fade-up">สมัครสมาชิก</li></Link>}
                    {user ? <li onClick={()=>{
                        quit(()=>{
                            change()
                        })
                    }} data-aos="fade-up">ออกจากระบบ</li> : null}
                </ul> :
                <ul></ul>}
            <div onClick={() => {
                if (status) {
                    setStatus(false)
                }
                else {
                    setStatus(true)
                }
            }} className="nav-toggle">
                <i className="fas fa-bars"></i>
            </div>
            <div className="cart-display">
                <Link style={{color: 'white'}} className="link" to="/cart"><img className="cart" src="https://image.flaticon.com/icons/png/512/3594/3594363.png"></img><p>{TotalCart == 0 ? null : TotalCart}</p></Link>
            </div>
        </div>
    )
}

export default Navbar