import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const JoinForm = () => {
  return (
    <div className="JoinFormContainer">
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Text className="font-weight-bold h3 py-3">
            Looking for a{" "}
            <span style={{ fontSize: "1.3em", color: "#00d1b2" }}> Poll? </span>
          </Form.Text>

          <Form.Control size="lg" type="text" placeholder="#Enter Poll Code" />
        </Form.Group>

        <Button variant="success" size="lg" type="submit">
          Find a Poll
        </Button>
      </Form>
    </div>
  );
};

export default JoinForm;
