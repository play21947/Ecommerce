import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import RegisterReducer from './RegisterReducer'
import CartReducer from './CartReducer'
import OrderReducer from './OrderReducer'

let AllReducers = combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    product: ProductReducer,
    cart: CartReducer,
    order: OrderReducer
})


export default AllReducers