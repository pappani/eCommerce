// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

export const cartReducer = (state = { cartItems: [], address: [] }, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return { ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)};
            } else return {...state, cartItems: [...state.cartItems, item]};
        case 'CART_REMOVE_ITEM':
            return {...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)};     // pass only the products that are different from the payload item
        case 'CART_SAVE_PAYMENT_METHOD':
            return {...state, paymentMethod: action.payload};
        case 'CART_SAVE_ADDRESS':
            return {...state, shippingAddress: action.payload};
        default:
            return state;
    }
}