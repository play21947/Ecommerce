import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AddToCart } from "../actions/CartActions"

import Swal from "sweetalert2"

const Product = ({ item }) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    let history = useHistory()
    let dispatch = useDispatch()

    let user = localStorage.getItem("user")

    let HandleBuy = (items) => {
        if (user) {
            history.push('/product_buy/'+items.id)
        }
        else{
            history.push('/login')
        }
    }

return (
    <div onClick={()=>HandleBuy(item)} className="product">
        <img src={item.product_img}></img>
        <div className="detail">
            <p>{item.product_name}</p>
            <p>{item.product_price}฿</p>
        </div>
        <p>({item.market})</p>
    </div>
)
}

export default Product