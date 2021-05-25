// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions.js';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? location.search.split('=')[1] : 1;    // qty=1, split and get the first item after the =, so the 2nd element of the array
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeItem = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkout = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h2>Carrello</h2>
                {cartItems.length === 0 ? <>Il tuo carrello è vuoto <Link to='/'><br></br>Torna indietro</Link></> : (<ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>€{item.price}</Col>
                                <Col md={2}>
                                <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </Form.Control>
                                </Col>
                                <Col md={2}><Button type='button' variant='light' onClick={() => removeItem(item.product)}><i className='fas fa-trash'></i></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>)}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Totale di {cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)} oggett{cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0) === 1 ? 'o' : 'i'}</h2>
                            €{cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item><Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkout}>Vai al Checkout</Button></ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
