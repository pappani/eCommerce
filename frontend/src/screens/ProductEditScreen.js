// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import { listProductDetails, updateProduct } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);  // similar to loading but for uploads

    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'PRODUCT_UPDATE_RESET' });
            history.push('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
        
    }, [dispatch, history, productId, product, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];     // only one file is accepted
        const formData = new FormData();
        formData.append('image', file);     // as in the backend
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' }};
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data); setUploading(false);
        } catch (error) {
            setUploading(false);
            console.error(error);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Torna indietro</Link>
            <FormContainer>
            <h1>Modifica prodotto</h1>
            {loadingUpdate && <></>}
            {errorUpdate && <h2>Errore {errorUpdate}</h2>}
            {loading ? <h2></h2> : error ? <h2>Errore</h2> : (
                <Form onSubmit={submit}>
                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Inserisci nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control type="number" placeholder="Inserisci prezzo" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci immagine" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                    <Form.File id='image-file' label='Scegli immagine' custom onChange={uploadFileHandler}>
                        {uploading && <h2>Caricamento...</h2>}
                    </Form.File>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci marca" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Pezzi disponibili</Form.Label>
                    <Form.Control type="number" placeholder="Inserisci pezzi disponibili" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci categoria" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci descrizione" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Conferma
                </Button>
            </Form>
            )}      
        </FormContainer>
        </>
    )
}

export default ProductEditScreen
