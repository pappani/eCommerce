// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions.js';
import FormContainer from '../components/FormContainer.js';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContainer>
            <h2>Accedi</h2>
            {error && <h2>Errore</h2>}
            {loading && <h2></h2>}
            <Form onSubmit={submit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Inserisci password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Button type="submit" variant="primary">
                    Accedi
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Nuovo utente? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Registrati</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
