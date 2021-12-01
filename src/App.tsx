import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import TabComponent from './components/tabs.component';
import HeaderComponent from './components/header.component';
import './assets/style/App.css';
import store from './store';
import SummaryComponent from './components/summary.component';

const App = ():JSX.Element => (
  <Provider store={store}>
    <HeaderComponent />
    <Container className="container">
      <Row>
        <Col md={8}>
          <TabComponent />
        </Col>
        <Col md={4} className="summary-container">
          <SummaryComponent />
        </Col>
      </Row>
    </Container>
  </Provider>
);

export default App;
