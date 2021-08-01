import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AsnycGetOrder } from "../actions/OrderActions"
import OrderItem from "./OrderItem"

const Order=()=>{

    let dispatch = useDispatch()

    let order = useSelector(state => state.order)

    useEffect(()=>{
        dispatch(AsnycGetOrder())
    },[])

    console.log(Object.keys(order.Order).length)

    return(
        <div className="order-display">
            {Object.keys(order.Order).length > 0 && !order.isLoadding ? order.Order.map((item, index)=>{
                return <OrderItem key={item.id} id={item.id} account={item.holder} index={index} item={JSON.parse(item.paper)}></OrderItem>
            }): <h1>ไม่มีออเดอร์*-*</h1>}
        </div>
    )
}

export default Order