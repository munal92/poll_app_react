import React, { useState } from "react";
import axiosHelper from "./utils/axiosHelper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import ReactGa from "react-ga";
const NewPollForm = () => {
  const history = useHistory();

  const [newPollQuestion, setNewPollQuestion] = useState({
    poll_question: "",
  });

  const [fields, setFields] = useState([
    { poll_answer: "", poll_id: 0, order_id: 0 },
  ]);

  const [formValidation, setFormValidation] = useState({
    validated: false,
    notValidIdMessage: "Enter a question please!",
    notValidIdMessage2: "Enter a answer please!",
    apiFetch: false,
  });
  // const [fields, setFields] = useState([
  //   { poll_answer: "lalaallaasddsaaaaaaaddaqwe1", poll_id: 0 },
  //   { poll_answer: "2", poll_id: 0 },
  //   { poll_answer: "lasldasdlsadsaddddddddddaqw?3", poll_id: 0 },
  //   { poll_answer: "yes its HAS 4", poll_id: 0 },
  //   { poll_answer: "5", poll_id: 0 },
  // ]);

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
      values.push({ poll_answer: null, poll_id: 0, order_id: 0 });
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
    fields.map((item, index) => ((item.poll_id = id), (item.order_id = index)));
  };
  const submitPollForm = (e) => {
    e.preventDefault();
    ReactGa.event({
      category: `Create Poll button`,
      action: `User clicked of Create Poll`,
    });
    if (newPollQuestion.poll_question !== "" && fields[0].poll_answer !== "") {
      let createdPollID;
      setFormValidation({ ...formValidation, apiFetch: true });
      axiosHelper()
        .post(`/poll/createpoll`, newPollQuestion)
        .then((res) => {
          createdPollID = res.data.poll_link;

          handleIDs(res.data.id);
          fields.map((val) => {
            makePostRequest(val);
          });
          setFormValidation({ ...formValidation, apiFetch: false });
          history.push(`/poll/${createdPollID}`);
        })

        .catch((err) => {
          console.error("error question post", err);
          setFormValidation({
            ...formValidation,
            validated: true,
            apiFetch: false,
          });
        });
      //  fields.map((val) =>
      //     axiosHelper()
      //       .post("/poll/createanswer", val)
      //       .then((r) => {
      //         //history.push(`/poll/${createdPollID}`);
      //       })
      //       .catch((er) => {
      //         console.log("error answer post", er);
      //       })
      //   );

      async function makePostRequest(val2) {
        let res = await axiosHelper().post("/poll/createanswer", val2);
        return res;
      }
    } else {
      setFormValidation({
        ...formValidation,
        validated: true,
        apiFetch: false,
      });
    }
  };

  return (
    <div className="NewPollContainer">
      <Form noValidate validated={formValidation.validated}>
        <Form.Text className="font-weight-bold h3 pb-3 mb-3 ">
          Create a{" "}
          <span style={{ fontSize: "1.3em", color: "#209cee" }}>
            {/* className="font-weight-bold h1" */}
            Poll
          </span>
        </Form.Text>
        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Question:</Form.Label>
          <Form.Control
            className="shadow-sm bg-white rounded"
            required
            name="poll_question"
            onChange={handleQuestionChange}
            size="lg"
            type="text"
            placeholder="Type a question"
          />
          <Form.Control.Feedback type="invalid">
            {formValidation.notValidIdMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Answers:</Form.Label>

          {fields.map((field, idx) => {
            return (
              <InputGroup key={`${field}-${idx}`}>
                <Form.Control
                  required
                  className="mb-3 shadow-sm bg-white rounded"
                  name="poll_answer"
                  // onChange={handleAnswersChange}
                  value={field.poll_answer || ""}
                  onChange={(e) => handleAnswersChange(idx, e)}
                  type="text"
                  placeholder={`Type answer ${idx + 1}`}
                />

                {fields.length !== 1 ? (
                  <Button
                    onClick={() => handleRemove()}
                    className="mb-3 shadow-sm bg-white rounded"
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
                <Form.Control.Feedback type="invalid">
                  {formValidation.notValidIdMessage2}
                </Form.Control.Feedback>
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
          {formValidation.apiFetch ? "Creating..." : "Create Poll"}
        </Button>
      </Form>
    </div>
  );
};

export default NewPollForm;
