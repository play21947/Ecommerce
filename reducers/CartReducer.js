let initialState = {
    cart: [],
    isLoadding: false
}

// state = {
//     cart: []
// }

let CartReducer=(state = initialState, action)=>{
    if(action.type === "ADD_TO_CART"){
        let updatedState = []
        let FoundItem = state.cart.find(item=> item.id === action.payload.id) // declare FoundItem ให้เท่ากับ state.cart ที่ state.cart.id === action.payload เก็บตัวที่ id เหมือนกันไว้ ถ้าเกิดว่าไม่เจอให้มัน return undifiend
        if(!FoundItem){ // ถ้าเกิดว่าไม่เจอไอเทมเลย
            updatedState = [...state.cart, action.payload] //ให้ updatedState = [ค่าเดิมที่มันมีอยู่ใน(state.cart), ค่าใหม่ที่เข้าไป(action.payload)]
        }
        else{//เเต่ถ้าเกิดว่าเจอไอเทมที่มีใน FoundItem
            updatedState = state.cart.map((item)=>{//ให้ updatedState เท่ากับ state.cart ที่วนไปเรื่อยๆ โดยจะเก็บ ค่าเป็น object
                // {
                //     id: 1,
                //     product_name: 'ปลาเผา',
                //     product_price: 10,
                //     quantity: (เช็คตรงนี้) item.id === FoundItem.id ? item.quantity + 1 : item.quantity
                // }
                return{
                    ...item,
                    quantity: item.id === FoundItem.id ? item.quantity < 10 && item.quantity > 0 ? item.quantity + 1 : item.quantity : item.quantity
                }
            })
        }
        return {
            cart: updatedState, //อัพเดท state.cart ไม่ใช่ update state อย่างเดียว!
        }
    }
    else if(action.type === "RESET_CART"){
        return {
            cart: []
        }
    }
    else if(action.type === "DELETE_CART"){
        let fil = state.cart.filter((item)=> item.id != action.payload.id)
        return{
            cart: fil
        }
    }
    else if(action.type === "INCREMENT"){
        let updatedState = state.cart.map((item)=>{
            return{
                ...item,
                quantity: item.id === action.payload.id ? item.quantity < 10 ? item.quantity + 1 : item.quantity : item.quantity
            }
        })
        return {
            cart: updatedState
        }
    }
    else if(action.type === "DECREMENT"){
        let updatedState = state.cart.map((item)=>{
            return{
                ...item,
                quantity: item.id === action.payload.id ? item.quantity > 1 ? item.quantity - 1 : item.quantity : item.quantity
            }
        })
        return {
            cart: updatedState
        }
    }
    else{
        return state
    }
}

export default CartReducer