import React, { useState } from "react";
import axiosHelper from "./utils/axiosHelper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
const NewPollForm = () => {
  const history = useHistory();
  const [newPollQuestion, setNewPollQuestion] = useState({
    poll_question: "",
  });
  const [newPollAnswers, setNewPollAnswers] = useState([
    {
      poll_answer: "",
      poll_id: 0,
    },
  ]);

  const [fields, setFields] = useState([{ poll_answer: "", poll_id: 0 }]);

  const handleQuestionChange = (e) => {
    e.persist();
    setNewPollQuestion({ ...newPollQuestion, [e.target.name]: e.target.value });
  };
  const handleAnswersChange = (i, e) => {
    e.persist();
    const values = [...fields];
    values[i].poll_answer = e.target.value;
    setFields(values);
  };

  function handleAdd() {
    if (fields.length !== 6) {
      const values = [...fields];
      values.push({ poll_answer: null, poll_id: 0 });
      setFields(values);
    }
  }
  function handleRemove(i) {
    if (fields.length !== 1) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
  }

  const handleIDs = (id) => {
    fields.map((item) => (item.poll_id = id));
  };
  const submitPollForm = (e) => {
    e.preventDefault();
    let createdPollID;

    axiosHelper()
      .post(`/poll/createpoll`, newPollQuestion)
      .then((res) => {
        createdPollID = res.data.poll_link;

        handleIDs(res.data.id);

        fields.map((val) =>
          axiosHelper()
            .post("/poll/createanswer", val)
            .then((r) => {
              history.push(`/poll/${createdPollID}`);
            })
            .catch((er) => {
              console.log("error answer post", er);
            })
        );
      })
      .catch((err) => {
        console.log("error question post", err);
      });
  };

  return (
    <div className="NewPollContainer">
      <Form>
        <Form.Text className="font-weight-bold h3 pb-3">
          Create a
          <span className="font-weight-bold h1" style={{ color: "#209cee" }}>
            {" "}
            Poll
          </span>
        </Form.Text>
        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Question:</Form.Label>
          <Form.Control
            name="poll_question"
            onChange={handleQuestionChange}
            size="lg"
            type="text"
            placeholder="Type a question"
          />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Answers:</Form.Label>

          {fields.map((field, idx) => {
            return (
              <InputGroup key={`${field}-${idx}`}>
                <Form.Control
                  className="mb-3"
                  name="poll_answer"
                  onChange={handleAnswersChange}
                  value={field.poll_answer || ""}
                  onChange={(e) => handleAnswersChange(idx, e)}
                  type="text"
                  placeholder={`Type answer ${idx + 1}`}
                />
                {fields.length !== 1 ? (
                  <Button
                    onClick={() => handleRemove()}
                    className="mb-3 "
                    as={InputGroup.Append}
                    style={{
                      backgroundColor: "#f9f8f8",
                      borderColor: "lightgray",
                      color: "black",
                    }}
                  >
                    x
                  </Button>
                ) : (
                  ""
                )}
                {/* <Button
                  onClick={() => handleRemove()}
                  className="mb-3"
                  as={InputGroup.Append}
                  style={{ backgroundColor: "#209cee" }}
                >
                  +
                </Button> */}
              </InputGroup>
            );
          })}
          <Form.Row>
            <Col md={12}>
              <Button
                size="md"
                block
                onClick={() => handleAdd()}
                className="btn-circle text-left"
                style={{
                  backgroundColor: "white",
                  borderColor: "lightgray",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                + Add answer
              </Button>
            </Col>
            {/* <Col md={1}>
              <Form.Text className="font-weight-bold h5"> Add </Form.Text>
            </Col> */}
          </Form.Row>
        </Form.Group>

        <Button onClick={submitPollForm} size="lg" type="submit">
          Create Poll
        </Button>
      </Form>
    </div>
  );
};

export default NewPollForm;
