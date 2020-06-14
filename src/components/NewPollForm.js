import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewPollForm = () => {
  return (
    <div className="NewPollContainer">
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Question:</Form.Label>
          <Form.Control size="lg" type="text" placeholder="Type a question" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label className="font-weight-bold h5">Answers:</Form.Label>
          <Form.Control type="text" placeholder="Type answer 1" />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control type="text" placeholder="Type answer 2" />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Control type="text" placeholder="Type answer 3" />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button size="lg" type="submit">
          Create a Poll
        </Button>
      </Form>
    </div>
  );
};

export default NewPollForm;
