// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { saveAddress } from '../actions/cartActions.js';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submit = (e) => {     // push user to PaymentScreen
        e.preventDefault();
        dispatch(saveAddress({ address, city, postalCode, country }));
        history.push('/payment');
    }

    return (
        <>
        <CheckoutSteps step1 step2 />
        <FormContainer>
            <h1>Spedizione</h1>
            <Form onSubmit={ submit }>
                <Form.Group controlId='address'>
                    <Form.Label>Indirizzo</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci indirizzo" value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='city'>
                    <Form.Label>Città</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci città" value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='postalCode'>
                    <Form.Label>CAP</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci CAP" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='country'>
                    <Form.Label>Nazione</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci nazione" value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Button type='submit' variant='primary'>Continua</Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default ShippingScreen
