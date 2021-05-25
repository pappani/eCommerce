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
            <Col xs={8}><Form.Control type='text' name='search' onChange={(e) => setKeyword(e.target.value)} style={{borderRadius: 25, height: 30, marginLeft: 10, marginTop: 5, fontSize: 15}} placeholder='Cerca prodotti' ></Form.Control></Col>
            <Col><Button type='submit' variant='alert' className='p-2' style={{marginLeft: -12, marginRight: 10}}><i style={{color: "white"}} className='fas fa-search' ></i></Button></Col>
            </Row>
        </Form>
        
        <Button type='submit' variant='primary' onClick={smartphones} className='p-1'>Smartphone</Button>&nbsp;&nbsp;
        <Button type='submit' variant='primary' onClick={computers} className='p-1'>Computer</Button>&nbsp;&nbsp;
        <Button type='submit' variant='primary' onClick={consoles} className='p-1'>Console</Button>&nbsp;&nbsp;
        <Button type='submit' variant='primary' onClick={accessories} className='p-1'>Accessori</Button>&nbsp;&nbsp;
        <Button type='submit' variant='primary' onClick={smarthome} className='p-1'>Domotica</Button>&nbsp;
        </>
    )
}

export default SearchBar