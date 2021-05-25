// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import { register } from '../actions/userActions.js';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Le password non coincidono');
        }
        dispatch(register(name, email, password));
    }

    return (
        <FormContainer>
            <h2>Registrazione</h2>
            {loading && <h2></h2>}
            {message && <h2>{message}</h2>}
            {error && <h2>Errore {error}</h2>}
            <Form onSubmit={submit}>
                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Inserisci nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Inserisci password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Conferma Password</Form.Label>
                    <Form.Control type="password" placeholder="Inserisci di nuovo la password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group><p></p>
                <Button type="submit" variant="primary">
                    Registra
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Sei già registrato? Accedi <Link to={'/login'}>qui</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
