// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <hr />
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Pappani Federico - Università di Parma - 298223
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
