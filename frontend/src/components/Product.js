// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className='my-3 rounded text-center'>
            <Link to={`/product/${product._id}`}>
                <Card.Img className="img-fluid" style={{maxHeight: '200px', width: 'auto'}} src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.avgRating} text={`${product.numReviews}`} />
                </Card.Text>
                <Card.Text as='h3'>€{product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

