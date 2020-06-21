import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ImageFormat from "./models/ImageFormat";
import {loadImage} from "./services/nasaService";

import ImageAPOD from "./components/ImageAPOD"
import InfoComponent from "./components/InfoComponent";

function App() {
  const [image, setImage] = useState<ImageFormat>({
    date: new Date(),
    explanation: "",
    hdurl: "",
    media_type: "",
    service_version: "",
    title: "",
    url: ""
  });
  useEffect(() => {
    loadImage(setImage);
  }, []);

  return (
    <Container>
      <Row className="row__centered">
        <Col sm={8}>
          <ImageAPOD image={image}></ImageAPOD>
        </Col>
        <Col sm={4}>
          <InfoComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
