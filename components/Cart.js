import axios from "axios"
import { useSelector } from "react-redux"
import { ResetCart } from "../actions/CartActions"
import CartItem from "./CartItem"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import CheckoutCreaditCard from '../payment/CheckoutCreditCard'

const Cart = () => {

    let dispatch = useDispatch()

    let cart = useSelector(state => state.cart.cart)
    let total = cart.reduce((sum, item)=> sum + (item.product_price * item.quantity), 0)
    let holder = localStorage.getItem('user')

    console.log(cart)


    let HandleOrder=(holder, cart)=>{
        axios.post("http://play2lover.ddns.net:3001/add_order",{
            holder: holder,
            cart: JSON.stringify(cart)
        }).then((res)=>{
            console.log(res.data)
        })
    }

    return (
        <div>
            {cart.length <= 0 || !cart ? null : <p className="total">ยอดรวมทั้งสิ้น : {cart.reduce((sum, item)=> sum + (item.product_price * item.quantity), 0)} ฿</p>}
            <div className="display-cart">
                {!cart || cart.length <= 0 ? <h1 className="stock-out-off">ไม่มีสินค้าในตะกร้า</h1> : cart.map((item) => {
                    return <CartItem key={item.id} item={item}></CartItem>
                })}
            </div>
            <div className="payment-flex">
            {cart.length <= 0 || !cart ? null : <div className="order"><button onClick={()=>{
                Swal.fire({
                    title: 'สั่งซื้อ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'สั่งซื้อเลย',
                    cancelButtonText: 'ยกเลิก'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'สั่งซื้อสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        HandleOrder(holder, cart)
                        dispatch(ResetCart())
                    }
                  })
            }}>สั่งซื้อสินค้า</button></div>}
            {cart.length <= 0 || !cart ? null : <CheckoutCreaditCard total={total} user={holder} cart={cart} HandleOrder={HandleOrder}/>}
            </div>
        </div>
    )
}

export default Cart