// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js';
import { getMyOrders } from '../actions/orderActions.js';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    const orderList = useSelector((state) => state.orderList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderList;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(getMyOrders());
            } else {
                setName(user.name); setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Le password non coincidono');
        }
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }

    return (
        <Row>
            <Col md={3}>
                <h1>Profilo utente</h1>
                {loading && <h2></h2>}
                {message && <h2>{message}</h2>}
                {success && <h2>Profilo aggiornato</h2>}
                {error && <h2>Errore {error}</h2>}
                <Form onSubmit={submit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="name" placeholder="Inserisci nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group><p></p>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group><p></p>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Inserisci password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group><p></p>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Conferma Password</Form.Label>
                        <Form.Control type="password" placeholder="Inserisci di nuovo la password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group><p></p>
                    <Button type="submit" variant="primary">
                        Aggiorna profilo utente
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h1>Ordini</h1>
                {loadingOrders ? <h2></h2> : errorOrders ? <h2>Errore {error}</h2> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Totale</th>
                                <th>Pagato</th>
                                <th>Consegnato</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>€ {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}><Button variant='light' className='btn-sm'>Dettagli</Button></LinkContainer></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
