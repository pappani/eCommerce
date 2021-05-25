// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBar from './SearchBar.js';
import { logout } from '../actions/userActions.js';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const logoutUser = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>eCommerce</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Route render={({history}) => <SearchBar history={history} />} />
                    <Nav className='ml-auto'>
                    <LinkContainer to='/cart'>
                        <Nav.Link>
                            <i className='fas fa-shopping-cart'></i> Carrello
                        </Nav.Link>
                    </LinkContainer>
                    {userInfo ? ( 
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profilo</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutUser}>Esci</NavDropdown.Item>
                    </NavDropdown>
                    ) : (
                    <LinkContainer to='/login'>
                        <Nav.Link>
                            <i className='fas fa-user'></i> Accedi
                        </Nav.Link>
                    </LinkContainer> )}
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Gestione' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Utenti</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Prodotti</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Ordini</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    )}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
