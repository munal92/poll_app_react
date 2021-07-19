import React, { useState, useEffect } from "react";
import axiosHelper from "../utils/axiosHelper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { faShareSquare, faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PollAnswers = (props) => {
  const [answersData, setanswersData] = useState([{}]);
  const [isRChecked, setIsRChecked] = useState(100);

  useEffect(() => {
    if (props.apiStatus) {
      let values = props.poll.answers;
      values.sort((a, b) => (a.order_id > b.order_id ? 1 : -1));

      setanswersData(values);
    }
  }, [props]);
  let backgroundColor = [
    "success",
    "danger",
    "info",
    "warning",
    "primary",
    "dark",
  ];

  let voteCalc = answersData.reduce(
    (totalAnswerCount, count) => totalAnswerCount + count.answer_count,
    0
  );

  const handleRadio = (e) => {
    e.persist();
    setIsRChecked(e.target.value);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    if (window.localStorage.getItem("pollid") !== props.poll.poll_link) {
      axiosHelper()
        .put(`/poll/answer/${isRChecked}`)
        .then((res) => {
          // props.setApiStatus(false);
          window.localStorage.setItem("pollid", props.poll.poll_link);
        })
        .catch((err) => {
          console.error("err", err);
        });
    } else {
      toast.info("🗳️ You have already voted.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Form>
      <Form.Text className="font-weight-bold h4 pb-4 pt-2">
        Q: {props.poll.poll_question}
      </Form.Text>
      <Form.Group>
        {answersData.map((item, index) => {
          return (
            <div key={index} className="pb-3">
              <h6>{item.poll_answer}</h6>
              <Form.Row className="align-items-center  ">
                <Col xs={1}>
                  <Form.Check
                    id={index}
                    name={item.poll_answer}
                    value={item.id}
                    checked={isRChecked == item.id ? true : false}
                    type="radio"
                    onChange={handleRadio}

                    // aria-label="radio 1"
                  />
                </Col>
                <Col className="" xs={11}>
                  <ProgressBar
                    striped
                    variant={backgroundColor[index]}
                    animated
                    now={
                      item.answer_count == 0
                        ? 0
                        : (item.answer_count * 100) / voteCalc
                    }
                    label={`${Math.floor(
                      (item.answer_count * 100) / voteCalc
                    )}%`}
                  />
                </Col>
              </Form.Row>
            </div>
          );
        })}
        <p className="testText text-right font-weight-normal py-0 my-0">
          🗳️
          <span className="font-italic font-weight-normal">
            {" "}
            {voteCalc} votes recorded
          </span>
        </p>
        <p className="testText text-right font-weight-normal py-0 my-0">
          🆔 {props.poll.poll_link}
        </p>
      </Form.Group>

      <Form.Row>
        <Form.Group className="pr-3 ">
          <Button
            className="voteBtn"
            onClick={submitAnswer}
            size="md"
            type="submit"
          >
            <FontAwesomeIcon className="mr-2" icon={faPoll} />
            Vote
          </Button>
        </Form.Group>
        <Form.Group>
          <CopyToClipboard
            text={props.copyLink.value}
            onCopy={() =>
              props.setCopyLink({ ...props.copyLink, copied: true })
            }
          >
            <Button
              onClick={() =>
                // props.toast.success(`📋 Link Copied!`, {
                //   position: props.toast.POSITION.TOP_CENTER,
                // })
                props.toast.success("📋 Link Copied!", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              }
              className="shareBtn"
              size="md"
              variant="info"
            >
              <FontAwesomeIcon className="mr-2" icon={faShareSquare} />
              Share
            </Button>
          </CopyToClipboard>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default PollAnswers;
