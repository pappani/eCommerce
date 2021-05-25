// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

// redux store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer } from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers.js';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, getMyOrdersReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers.js';

const cartItemsStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const addressStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const initialState = { cart: { cartItems: cartItemsStorage, shippingAddress: addressStorage }, userLogin: { userInfo: userInfoStorage}};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: getMyOrdersReducer,
    adminOrderList: orderListReducer,
    orderDeliver: orderDeliverReducer
});

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;