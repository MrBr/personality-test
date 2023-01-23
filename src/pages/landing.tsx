import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Paths } from "../constants";

const Landing = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Col className="justify-content-center">
          <h1 className="text-center">Personality test</h1>
          <h2 className="text-center">
            Are you an introvert or extrovert? Let's find out
          </h2>
          <Link to={Paths.Quiz}>
            <Button className="m-auto d-block">Start quiz</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
