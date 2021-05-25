// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='search' onChange={(e) => setKeyword(e.target.value)} placeholder='Cerca prodotti' className='mr-sm-2 ml-sm-5' ></Form.Control>
        <Button type='submit' variant='primary' className='p-2'><i className='fas fa-search'></i></Button>   
        </Form>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' variant='primary' onClick={smartphones} className='p-2'>Smartphone</Button>
        <Button type='submit' variant='primary' onClick={computers} className='p-2'>Computer</Button>
        <Button type='submit' variant='primary' onClick={consoles} className='p-2'>Console</Button>
        <Button type='submit' variant='primary' onClick={accessories} className='p-2'>Accessori</Button>
        <Button type='submit' variant='primary' onClick={smarthome} className='p-2'>Domotica</Button>
        </>
    )
}

export default SearchBar