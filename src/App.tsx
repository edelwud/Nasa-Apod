import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          Text
        </Col>
        <Col sm={4}>
          Text
        </Col>
      </Row>
    </Container>
  );
}

export default App;
