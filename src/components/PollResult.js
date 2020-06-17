import React, { useState, useEffect } from "react";
import axiosHelper from "./utils/axiosHelper";
import { useParams } from "react-router-dom";
import PollAnswers from "./PollResultsSec/PollAnswers";
import PollGraph from "./PollResultsSec/PollGraph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PollResult = () => {
  const { itemID } = useParams();
  // const { path, url } = useRouteMatch();
  const [poll, setPoll] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [copyLink, setCopyLink] = useState({
    value: window.location.href,
    copied: false,
  });

  useEffect(() => {
    setTimeout(() => {
      fetchApi();
    }, 1000);
  });

  const fetchApi = () => {
    if (!apiStatus) {
      try {
        axiosHelper()
          .get(`/poll/${itemID}`)
          // .get(`/poll/09876`)
          .then((res) => {
            setPoll(res.data);
            setApiStatus(true);
          })
          .catch((err) => {
            console.log("err", err);
          });
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <section className="PollResContainer">
      <Container>
        <Row className="align-items-center">
          <Col md={5} sm={12}>
            <PollAnswers
              setApiStatus={setApiStatus}
              apiStatus={apiStatus}
              poll={poll}
              setPoll={setPoll}
              setCopyLink={setCopyLink}
              copyLink={copyLink}
              toast={toast}
            />
          </Col>
          <Col md={2} sm={12} className="verticalLineCont">
            <hr className="new1" />
            <span className="verticalLine"></span>
          </Col>
          <Col md={5} sm={12}>
            <PollGraph apiStatus={apiStatus} poll={poll} setPoll={setPoll} />
          </Col>
        </Row>
      </Container>
      <div className="graphSvg-1"></div>
      <div className="graphSvg-2"></div>
      <div className="graphSvg-3"></div>
      <ToastContainer />
    </section>
  );
};

export default PollResult;
