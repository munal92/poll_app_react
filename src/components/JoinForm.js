import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import axiosHelper from "./utils/axiosHelper";
import ReactGa from "react-ga";
const JoinForm = (props) => {
  const history = useHistory();

  const [pollLink, setPollLink] = useState({ poll_link: "" });

  const [formValidation, setFormValidation] = useState({
    validated: false,
    notValidIdMessage: "Enter a valid poll id please!",
    apiFetch: false,
  });

  const handleChange = (e) => {
    e.persist();
    setPollLink({ ...pollLink, [e.target.name]: e.target.value });
  };

  const submitFindPoll = (e) => {
    e.preventDefault();
    ReactGa.event({
      category: `Find Poll button`,
      action: `User clicked of Find Poll`,
    });
    setFormValidation({ ...formValidation, apiFetch: true });
    axiosHelper()
      .get(`/poll/${pollLink.poll_link}`)
      // .get(`/poll/09876`)
      .then((res) => {
        setFormValidation({ ...formValidation, apiFetch: false });
        history.push(`/poll/${pollLink.poll_link}`);
      })
      .catch((err) => {
        console.error("err", err);
        setFormValidation({
          ...formValidation,
          validated: true,
          apiFetch: false,
        });
        setPollLink({ ...pollLink, poll_link: "" });
      });
  };

  return (
    <div className="JoinFormContainer ">
      <Form noValidate validated={formValidation.validated}>
        <Form.Group controlId="formBasicText">
          <Form.Text className="font-weight-bold h3 py-3">
            Looking for a
            <span style={{ fontSize: "1.3em", color: "#00d1b2" }}> Poll? </span>
          </Form.Text>

          <Form.Control
            className="shadow-sm bg-white rounded"
            required
            name="poll_link"
            onChange={handleChange}
            size="lg"
            type="text"
            placeholder="Enter a Poll ID"
            value={pollLink.poll_link}
          />
          <Form.Control.Feedback type="invalid">
            {formValidation.notValidIdMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Button onClick={submitFindPoll} variant="info" size="lg" type="submit">
          {formValidation.apiFetch ? "Checking..." : "Find a Poll"}
        </Button>
      </Form>
    </div>
  );
};

export default JoinForm;
