import { useState } from "react"
import { useDispatch } from "react-redux"
import { AddToCart, AsnycAddToCart } from "../actions/CartActions"
import Swal from "sweetalert2"

const Buy=({item})=>{

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

    let [status, setStatus] = useState(false)

    let dispatch = useDispatch()

    return(
        <div className="buy-item">
            <img src={item.product_img}></img>
            <div className="buy-detail">
                <p>{item.product_name} ({item.market})</p>
                <h2>฿{item.product_price}</h2>
                <hr/>
                {status ? <button disabled>กำลังเพิ่มเข้ารถเข็น...</button> : <button onClick={()=>{
                    setStatus(true)
                    setTimeout(()=>{
                        setStatus(false)
                        dispatch(AddToCart({...item, quantity: 1}))
                        Toast.fire({
                            icon: 'success',
                            title: 'เพิ่มใส่ตะกร้าเเล้ว'
                        })
                    }, 2000)
                }}>เพิ่มเข้ารถเข็น</button>}
                {!item.recap ? <p className="recap">ไม่มีคำบรรยาย</p> : <p className="recap">{item.recap}</p>}
            </div>
        </div>
    )
}

export default Buy