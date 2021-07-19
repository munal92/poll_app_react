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
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import MetaTags from "react-meta-tags";
const PollResult = () => {
  const history = useHistory();
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
    }, 2000);
  });

  const fetchApi = () => {
    if (true) {
      try {
        axiosHelper()
          .get(`/poll/${itemID}`)
          // .get(`/poll/09876`)
          .then((res) => {
            setPoll(res.data);
            setApiStatus(true);
          })
          .catch((err) => {
            console.error("err", err);

            toast.error(`Poll not exist.\n Redirecting to the home page... `, {
              position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
              setApiStatus(false);
              history.push(`/`);
            }, 3000);
          });
      } catch (err) {
        throw err;
      }
    }

    console.log("New", poll.poll_question);
  };

  return (
    <section className="PollResContainer">
      <Container>
        {!apiStatus ? (
          <Container>
            <Row className="align-items-center justify-content-center mb-2">
              <h4>Loading...</h4>
            </Row>
            <Row className="align-items-center justify-content-center">
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="warning" />
            </Row>
          </Container>
        ) : (
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
        )}
      </Container>
      <div className="graphSvg-1"></div>
      <div className="graphSvg-2"></div>
      <div className="graphSvg-3"></div>
      <MetaTags>
        <meta name="Question" content={poll.poll_question} />
      </MetaTags>
    </section>
  );
};

export default PollResult;
