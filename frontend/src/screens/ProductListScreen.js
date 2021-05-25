// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions.js';

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    useEffect(() => {
        dispatch({ type: 'PRODUCT_CREATE_RESET' });
        if (!userInfo.isAdmin) {
            history.push('/login');
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

    const deleteHandler = (id) => {
        if (window.confirm('Sei sicuro?')) { 
            dispatch(deleteProduct(id));
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct());
    }
    
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Prodotti</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Crea prodotto
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <></>}
            {errorDelete && <h2>Errore</h2>}
            {loadingCreate && <></>}
            {errorCreate && <h2>Errore</h2>}
            {loading ? <></> : error ? <h2>Errore</h2> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Prezzo</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Modifica/Elimina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>€ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='dark' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen;
