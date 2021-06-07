// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions.js';

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
    //const orderPay = useSelector((state) => state.orderPay);
    //const { loading: loadingPay, success: successPay } = orderPay;

    const decimals = (n) => { return (Math.round(n * 100) / 100).toFixed(2); };
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, history, userInfo]);
    if (!loading) { order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0); }
    const pay = () => {
        dispatch(payOrder(orderId));
        window.prompt('Inserisci numero carta di credito: ');
        window.alert('Ordine pagato con successo.');
        window.location.reload();
    }
    const signPaid = () => {
        dispatch(payOrder(orderId));
        window.alert('Ordine pagato con successo.');
        window.location.reload();
    }
    const deliver = () => {
        dispatch(deliverOrder(orderId));
        window.location.reload();
    }

    return loading ? <></> : error ? <h2>Errore {error}</h2> : <>
    <h2>Ordine N. {order._id}</h2>
    <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Spedizione</h2>
                            <p><strong>Nome: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong>{order.user.email}</p>
                            <p>
                                <strong>Indirizzo: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered && (<strong>Consegnato il {order.deliveredAt}</strong>)}
                            {(!order.isDelivered && order.isPaid) && (<strong>Non consegnato. Arriverà tra pochi giorni</strong>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Pagamento</h2>
                            <p>
                            <strong>Metodo: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<strong>Pagato il {order.paidAt}</strong>
                            ) : (order.paymentMethod === 'Contrassegno') ? (<strong>Da pagare alla consegna</strong>) : (<strong>Non pagato</strong>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Oggetti</h2>
                            {order.orderItems.length === 0 ? (<h2>Ordine vuoto</h2>) : (
                            <ListGroup variant='flush'>{order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x €{item.price} = €{decimals(item.qty * item.price)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Riepilogo ordine</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Oggetti</Col>
                                    <Col>€ {decimals(order.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Spedizione</Col>
                                    <Col>€ {decimals(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Totale</Col>
                                    <Col>€ {decimals(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {(!order.isPaid && (order.paymentMethod !== 'Contrassegno')) && (
                                <ListGroup.Item>
                                    {<Button className="btn-block" onClick={pay}>Paga ora € {decimals(order.totalPrice)}</Button>}
                                </ListGroup.Item>
                            )}
                            {(order.isPaid && !order.isDelivered) && (order.paymentMethod !== 'Contrassegno') && (
                                <ListGroup.Item>
                                    {<Button className="btn-block" onClick={deliver}>Segna consegnato</Button>}
                                </ListGroup.Item>
                            )}
                            {(order.paymentMethod === 'Contrassegno' && !order.isPaid && !order.isDelivered) && (
                                <ListGroup.Item>
                                {<Button className="btn-block" onClick={signPaid}>Segna pagato</Button>}
                            </ListGroup.Item>
                            )}
                            {(order.paymentMethod === 'Contrassegno' && order.isPaid && !order.isDelivered) && (
                                <ListGroup.Item>
                                {<Button className="btn-block" onClick={deliver}>Segna consegnato</Button>}
                            </ListGroup.Item>
                            )}
                            {error && <h2>Errore {error}</h2>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen;
