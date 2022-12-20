
import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    PRODUCT_AMOUNT,
    UPDATE_TOTAL
} from '../../types'

const OrderReducer = (state, action) => {

    switch(action.type) {
        case SELECT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCT_AMOUNT: 
            return{
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        case UPDATE_TOTAL: 
            return{
                ...state,
                total: state.products.reduce((newTotal, product) => newTotal += product.price * product.amount, 0)
            }
        default:
            return state
    }

}
 
export default OrderReducer;