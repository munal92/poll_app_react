import React from "react";
import NewPollForm from "./NewPollForm";
import JoinForm from "./JoinForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Home = () => {
  return (
    <section className="homeContainer">
      <Container>
        <Row className="align-items-center">
          <Col md={5} sm={12}>
            <NewPollForm />
          </Col>
          <Col md={2} sm={12} className="verticalLineCont">
            <hr className="new1" />
            <span className="verticalLine"></span>
          </Col>
          <Col md={5} sm={12}>
            <JoinForm />
          </Col>
        </Row>
      </Container>
      <div className="graphSvg-1"></div>
      <div className="graphSvg-2"></div>
      <div className="graphSvg-3"></div>
    </section>
  );
};

export default Home;
