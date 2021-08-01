import { useDispatch } from "react-redux"
import { Decrement, DeleteCart, Increment } from "../actions/CartActions"
import Swal from "sweetalert2"

const CartItem = ({ item }) => {

    let dispatch = useDispatch()

    let HandleIncrement = (items) => {
        dispatch(Increment({ ...items }))
    }

    let HandleDecrement = (items) => {
        dispatch(Decrement({ ...items }))
    }

    let HandleDelete = (items) => {
        Swal.fire({
            title: 'ต้องการเอาออกจากตระกร้า?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'เอาออก',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeleteCart({ ...items }))
            }
        })
    }

    return (
        <div className="displaycart-item">
            <div className="cart-item">
                <img src={item.product_img}></img>
                <p>{item.product_name}</p>
                <p>x{item.quantity}</p>
                <p className="cart-product">{item.product_price * item.quantity}฿</p>
                <button className="delete" onClick={() => HandleDelete(item)}>X</button>
            </div>
            <div className="control">
                <button className="increment" onClick={() => HandleIncrement(item)}>+</button>
                <button className="decrement" onClick={() => HandleDecrement(item)}>-</button>
            </div>
        </div>
    )
}

export default CartItem