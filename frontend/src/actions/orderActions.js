// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_CREATE_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'ORDER_CREATE_FAIL', payload: message });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_DETAILS_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'ORDER_DETAILS_FAIL', payload: message });
    }
}

export const payOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_PAY_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${orderId}/pay`, config);
        dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'ORDER_PAY_FAIL', payload: message });
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'GET_MY_ORDERS_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        dispatch({ type: 'GET_MY_ORDERS_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'GET_MY_ORDERS_FAIL', payload: message });
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_LIST_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders', config);
        dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'ORDER_LIST_FAIL', payload: message });
    }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_DELIVER_REQUEST' });
        const { userLogin: { userInfo }} = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${orderId}/deliver`, config);
        dispatch({ type: 'ORDER_DELIVER_SUCCESS', payload: data });
    } catch (error) { 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: 'ORDER_DELIVER_FAIL', payload: message });
    }
}