// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product.js';
import { listProducts } from '../actions/productActions.js';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            {error && <h2>Errore</h2>}
            {loading && <></>}
            <h1>Prodotti</h1>
            <Row>
                { products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={ product } />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
