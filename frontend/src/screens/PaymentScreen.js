// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { savePaymentMethod } from '../actions/cartActions.js';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {     // if shipping address is not set, push user back to ShippingScreen
        history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Carta di Credito');
    const dispatch = useDispatch();
    const submit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/orderConfirm');    // push user to the last page
    }

    return (
        <>
        <CheckoutSteps step1 step2 step3 />
        <FormContainer>
            <h1>Pagamento</h1>
            <Form onSubmit={ submit }>
                <Form.Group>
                    <Form.Label as='legend'>
                        Seleziona metodo di pagamento
                    </Form.Label>
                <Col>
                    <Form.Check type='radio' label='Carta di Credito' id='creditCard' name='paymentMethod' value='Carta di credito' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Contrassegno' id='cash' name='paymentMethod' value='Contrassegno' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                </Form.Group><p></p>
                <Button type='submit' variant='primary'>Continua</Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen
