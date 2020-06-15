import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory, Link } from "react-router-dom";
const JoinForm = (props) => {
  const history = useHistory();

  const [pollLink, setPollLink] = useState({ poll_link: "" });

  const handleChange = (e) => {
    e.persist();
    setPollLink({ ...pollLink, [e.target.name]: e.target.value });
  };

  const submitFindPoll = (e) => {
    e.preventDefault();
    history.push(`/poll/${pollLink.poll_link}`);
  };

  console.log(pollLink);
  return (
    <div className="JoinFormContainer">
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Text className="font-weight-bold h3 py-3">
            Looking for a{" "}
            <span style={{ fontSize: "1.3em", color: "#00d1b2" }}> Poll? </span>
          </Form.Text>

          <Form.Control
            name="poll_link"
            onChange={handleChange}
            size="lg"
            type="text"
            placeholder="#Enter Poll Code"
          />
        </Form.Group>

        <Button
          onClick={submitFindPoll}
          variant="success"
          size="lg"
          type="submit"
        >
          Find a Poll
        </Button>
      </Form>
    </div>
  );
};

export default JoinForm;
