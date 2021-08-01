import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../App.css'

let OrderItem = ({ item, index, account, id }) => {

    let history = useHistory()

    console.log(item)

    let HandleDelete=(id)=>{
        axios.post("http://play2lover.ddns.net:3001/delete_order",{
            id: id
        }).then((res)=>{
            if(res.data){
                history.push('/product')
                history.push('/order')
            }
        })
    }

    return (
        <div className="order-item">
            <p>รายการสั่งซื้อที่ : {id}</p>
            <h6 className="account-order">{account}</h6>
            <hr />
            <button className="order-done" onClick={()=>{
                HandleDelete(id)
            }}>X</button>
            <div className="order-list">
                <h1>{item.map((item, index) => {
                    return (
                        <div>
                            <h5>{item.product_name} x {item.quantity} = {item.quantity * item.product_price}</h5>
                        </div>
                    )
                })}</h1>
            </div>
            <p className="total-order">ยอดรวม : {item.reduce((sum, item) => sum + (item.quantity * item.product_price), 0)} บาท</p>
        </div>
    )
}

export default OrderItem