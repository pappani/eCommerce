// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import { getUserDetails, updateUser } from '../actions/userActions.js';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'USER_UPDATE_RESET' });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name); setEmail(user.email); setIsAdmin(user.isAdmin);
            }
        }
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name); setEmail(user.email); setIsAdmin(user.isAdmin);
        }
    }, [dispatch, history, userId, user, successUpdate]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Torna indietro</Link>
            <FormContainer>
            <h2>Modifica utente</h2>
            {loadingUpdate && <></>}
            {errorUpdate && <h2>Errore</h2>}
            {loading ? <h2></h2> : error ? <h2>Errore</h2> : (
                <Form onSubmit={submit}>
                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Inserisci nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check type="checkbox" label="E' admin?" checked={isAdmin} value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
