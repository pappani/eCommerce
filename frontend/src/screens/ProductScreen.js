// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions.js';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { error: errorProductReview, success: successProductReview } = productReviewCreate;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (successProductReview) { alert('Recensione aggiunta.'); setRating(0); setComment(''); dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' }); }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);
    const addToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
    const submit = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, {rating, comment}));
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Indietro
            </Link>
            {loading ? (
            <></>
            ) : error ? (
            <h2>Errore</h2>
            ) : (
            <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.avgRating} text={`${product.numReviews} recensioni`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Prezzo: €{product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Descrizione: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Prezzo:
                                    </Col>
                                    <Col>
                                        <strong>€{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Stato:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'Disponibile' : 'Non Disponibile'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantità:</Col>
                                        <Col>
                                        <Form.Control as='select' value={ qty } onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}> {x + 1} </option>))}
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={ addToCart } className='btn-block' type='button' disabled={product.countInStock === 0} >
                                    Aggiungi al Carrello
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Recensioni</h2>
                    {product.reviews.length === 0 && 'Nessuna recensione'}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                {review.createdAt.substring(0, 10)}<p></p>
                                {review.comment}
                            </ListGroup.Item>
                        ))}
                    <ListGroup.Item>
                        <h2>Scrivi una recensione</h2>
                        {errorProductReview && <h2>Errore {errorProductReview}</h2>}
                        {userInfo ? (<Form onSubmit={submit}><Form.Group controlId='rating'><Form.Label>Voto</Form.Label>
                        <Form.Control as='select' className="sm" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value=''> </option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Form.Control></Form.Group>
                        <Form.Group controlId='comment'><Form.Label>Commento</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control></Form.Group><p></p>
                        <Button type='submit' variant='primary'>Invia</Button></Form>
                        ) : <><Link to='/login'>Accedi</Link> per scrivere una recensione</>}
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>)}
        </>
    )
}

export default ProductScreen
