import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AsnycProduct } from "../actions/ProductActions"
import Product from "./Product"

const DisplayProduct = () => {

    let product = useSelector(state => state.product)
    let cart = useSelector(state => state.cart)
    let [search, setSearch] = useState('')
    let itemSearch

    if (product.isLoadding === false && product.product.length > 0) {
        itemSearch = product.product.filter((item) => {
            console.log(item.product_name.includes(search))
            return item.product_name.includes(search) || item.market.includes(search) // ให้ fil เก็บตัวที่เหมือนกับ search
        })
    }

    // itemSearch = [
    //     {
    //         id: 3,
    //         product_name: 'ส้มตำ'
    //     },
    //     {
    //         id: 7,
    //         product_name: 'น้าค้าง'
    //     }
    // ]


    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(AsnycProduct())
    }, [])

    console.log(cart)

    return (
        <div>
            <div className="search">
                <input onChange={(e) => {
                    setSearch(e.target.value)
                }} placeholder="ค้นหา" value={search}></input>
                <img src="https://image.flaticon.com/icons/png/512/710/710082.png"></img>
                {search.length < 1 ? null : <button onClick={() => {
                    setSearch('')
                }} className="reset-search">x</button>}
            </div>
            <div className="display-product">
                {product.isLoadding == false && product.product.length > 0 ? itemSearch.map((item) => {
                    return <Product key={item.id} item={item}></Product>
                }) : null}
            </div>
        </div>
    )
}

export default DisplayProduct