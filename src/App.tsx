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
import ChangeImageForm from "./components/ChangeImageForm";
import Toast from "react-bootstrap/Toast";
import ErrorFormat from "./models/ErrorFormat";

function App() {
  const [image, setImage] = useState<ImageFormat>({
    date: new Date(),
    explanation: "",
    hdurl: "",
    media_type: "image",
    service_version: "",
    title: "",
    url: ""
  });
  const [needUpdate, update] = useState<boolean>(false);
  const [error, setError] = useState<ErrorFormat>({ explanation: "", title: "", occurred: false });
  useEffect(() => {
    loadImage(setImage).then(() => {
      setError({ explanation: "", title: "", occurred: false });
    }).catch((result: string) => {
      console.log(result)
      setError({ explanation: result.toString(), title: "Error", occurred: true });
    })
  }, [needUpdate]);



  return (
    <Container>
      <Row className="row__centered">
        <Col sm={8}>
          <ImageAPOD image={image} />
        </Col>
        <Col sm={4}>
          <div className="col__space_around">
            <div>
              <InfoComponent />
              <ChangeImageForm updateAPODImage={update} />
            </div>
            <div>
              <Toast className={error.occurred ? "" : "hide"}>
                <Toast.Header>
                  <strong className="mr-auto">{error.title}</strong>
                </Toast.Header>
                <Toast.Body>{error.explanation}</Toast.Body>
              </Toast>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
