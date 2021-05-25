// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { createOrder } from '../actions/orderActions.js';

const OrderConfirm = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    if (!cart.shippingAddress.address) {
        history.push('/shipping')
    } else if (!cart.paymentMethod) {
        history.push('/payment')
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;
    const confirm = () => {
        dispatch(createOrder({ 
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }));
    }
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success]);

    // prices
    const decimals = (n) => { return (Math.round(n * 100) / 100).toFixed(2); };
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    cart.shippingPrice = 9.90;
    cart.totalPrice = decimals((cart.itemsPrice + cart.shippingPrice));

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Spedizione</h2>
                            <p>
                                <strong>Indirizzo: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Pagamento</h2>
                            <strong>Metodo: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Oggetti</h2>
                            {cart.cartItems.length === 0 ? (<h2>Il carrello è vuoto</h2>) : (
                            <ListGroup variant='flush'>{cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x € {item.price} = € {decimals(item.qty * item.price)}
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
                                    <Col>€ {decimals(cart.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Spedizione</Col>
                                    <Col>€ {decimals(cart.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Totale</Col>
                                    <Col>€ {decimals(cart.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error && <h2>Errore {error}</h2>}
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={confirm}>Conferma</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderConfirm;
