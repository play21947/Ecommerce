import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Buy from "./Buy"
import { useHistory } from "react-router-dom"

const ProductBuy = () => {

    let [product, setProduct] = useState([])

    let history = useHistory()

    let id = useParams()

    console.log(id.id)

    useEffect(() => {
        axios.get('http://play2lover.ddns.net:3001/product_buy/' + id.id).then((res) => {
            setProduct(res.data)
        })
    }, [])

    console.log(product)

    return (
        <div>
            <button onClick={()=> history.push('/display_product')} className="shop-continue">กลับไปซื้อต่อ</button>
            <div className="buy">
                {product.length > 0 || product ? product.map((item) => {
                    return <Buy key={item.id} item={item}></Buy>
                }) : null}
            </div>
        </div>
    )
}

export default ProductBuy