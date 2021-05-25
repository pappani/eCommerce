// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Accedi</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Accedi</Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Spedizione</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Spedizione</Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Pagamento</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Pagamento</Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/orderCompleted'>
                        <Nav.Link>Ordine Completato</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Ordine Completato</Nav.Link> )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
