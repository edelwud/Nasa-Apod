import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import config from "../constatnts/nasa"
import ImageFormat from "../models/ImageFormat";
import ErrorFormat from "../models/ErrorFormat";
import {loadImage} from "../services/nasaService";

import ImageAPOD from "../components/ImageAPOD"
import InfoComponent from "../components/InfoComponent";
import ChangeImageForm from "../components/ChangeImageForm";
import AlertDismissible from "../components/AlertDismissable";

function MainPage() {
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

  return (
    <Container>
      <Row className="row__centered">
        <Col sm={8}>
          <ImageAPOD image={image} />
        </Col>
        <Col sm={4}>
          <InfoComponent />
          <AlertDismissible error={error} setError={setError} />
          <ChangeImageForm setError={setError} updateAPODImage={update} />
          <p>Other pictures u can find <Link to="/pictures">here</Link>.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
