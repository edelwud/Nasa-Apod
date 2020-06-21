import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import config from "./constatnts/nasa"
import ImageFormat from "./models/ImageFormat";
import {loadImage} from "./services/nasaService";
import ErrorFormat from "./models/ErrorFormat";

import ImageAPOD from "./components/ImageAPOD"
import InfoComponent from "./components/InfoComponent";
import ChangeImageForm from "./components/ChangeImageForm";
import Alert from "react-bootstrap/Alert";

function App() {
  const [image, setImage] = useState<ImageFormat>({
    date: new Date(),
    explanation: "",
    hdurl: "",
    media_type: "image",
    service_version: "",
    title: "",
    url: config.ERROR_IMAGE
  });
  const [needUpdate, update] = useState<boolean>(false);
  const [error, setError] = useState<ErrorFormat>({ explanation: "", title: "", occurred: false });
  useEffect(() => {
    loadImage(setImage).then(() => {
      setError({ explanation: "", title: "", occurred: false });
    }).catch((result: string) => {
      setImage({ ...image, title: "Error", explanation: result.toString(), media_type: "image", url: config.ERROR_IMAGE })
      setError({ explanation: result.toString(), title: "Error", occurred: true });
    })
  }, [needUpdate]);

  function AlertDismissibleExample() {
    if (error.occurred) {
      return (
        <Alert variant="danger" onClose={() => setError({ ...error, occurred: false })} dismissible>
          <Alert.Heading>{error.title}</Alert.Heading>
          <p>
            {error.explanation}
          </p>
        </Alert>
      );
    }
    return <></>
  }

  return (
    <Container>
      <Row className="row__centered">
        <Col sm={8}>
          <ImageAPOD image={image} />
        </Col>
        <Col sm={4}>
          <InfoComponent />
          <AlertDismissibleExample />
          <ChangeImageForm updateAPODImage={update} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
