import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../assets/img/logo.png';

const HeaderComponent = (): JSX.Element => (
  <Navbar expand="xxl" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <img alt="sewer vectorized logo" src={logo} height="50" />
        {' '}
        <b>Rateio Churras</b>
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default HeaderComponent;
