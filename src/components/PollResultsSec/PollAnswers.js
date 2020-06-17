import React, { useState, useEffect } from "react";
import axiosHelper from "../utils/axiosHelper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const PollAnswers = (props) => {
  const [answersData, setanswersData] = useState([{}]);
  const [isRChecked, setIsRChecked] = useState(100);

  useEffect(() => {
    if (props.apiStatus) {
      setanswersData(props.poll.answers);
    }
  }, [props]);
  let backgroundColor = [
    "success",
    "info",
    "warning",
    "danger",
    "dark",
    "primary",
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

    axiosHelper()
      .put(`/poll/answer/${isRChecked}`)
      .then((res) => {
        props.setApiStatus(false);
      })
      .catch((err) => {
        console.log("err PollAnswers ", err);
      });
  };

  return (
    <Form>
      <Form.Text className="font-weight-bold h4 pb-3">
        Q: {props.poll.poll_question}
      </Form.Text>
      <Form.Group>
        {answersData.map((item, index) => {
          return (
            <div key={index}>
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
      </Form.Group>
      <Button onClick={submitAnswer} size="md" type="submit">
        Vote
      </Button>
      <CopyToClipboard
        text={props.copyLink.value}
        onCopy={() => props.setCopyLink({ copied: true })}
      >
        <Button
          className="mx-4"
          onClick={() =>
            props.toast.success(`Link Copied!`, {
              position: props.toast.POSITION.TOP_CENTER,
            })
          }
          size="md"
        >
          {" "}
          Share
        </Button>
      </CopyToClipboard>
    </Form>
  );
};

export default PollAnswers;
