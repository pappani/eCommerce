// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const adminOrderList = useSelector(state => state.adminOrderList);
    const { loading, error, orders } = adminOrderList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);
    const decimals = (n) => { return (Math.round(n * 100) / 100).toFixed(2); };

    return (
        <>
            <h1>Ordini</h1>
            {loading ? <></> : error ? <h2>Errore</h2> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Utente</th>
                            <th>Data</th>
                            <th>Prezzo</th>
                            <th>Pagato</th>
                            <th>Consegnato</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>€ {decimals(order.totalPrice)}</td>
                                <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='dark' className='btn-sm'>
                                            Dettagli
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen;
