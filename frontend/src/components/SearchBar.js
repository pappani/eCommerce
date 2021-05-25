// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) { history.push(`/search/${keyword}`); } else { history.push('/'); }
    }
    const accessories = () => { history.push('/search/Accessori'); }
    const smartphones = () => { history.push('/search/Smartphone'); }
    const consoles = () => { history.push('/search/Console'); }
    const smarthome = () => { history.push('/search/Domotica'); }
    const computers = () => { history.push('/search/Computer'); }

    return (
        <>
        <Form onSubmit={submitHandler} className='flex-fill' inline>
            <Row>
            <Col xs={8}><Form.Control type='text' name='search' onChange={(e) => setKeyword(e.target.value)} placeholder='Cerca prodotti' ></Form.Control></Col>
            <Col><Button type='submit' variant='alert' className='p-2'><i className='fas fa-search' ></i></Button></Col>
            </Row>
        </Form>
        
        <Button type='submit' variant='primary' onClick={smartphones} className='p-2'>Smartphone</Button>&nbsp;
        <Button type='submit' variant='primary' onClick={computers} className='p-2'>Computer</Button>&nbsp;
        <Button type='submit' variant='primary' onClick={consoles} className='p-2'>Console</Button>&nbsp;
        <Button type='submit' variant='primary' onClick={accessories} className='p-2'>Accessori</Button>&nbsp;
        <Button type='submit' variant='primary' onClick={smarthome} className='p-2'>Domotica</Button>
        </>
    )
}

export default SearchBar