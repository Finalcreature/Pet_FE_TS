import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../libs/UserContext";

function SignModal({ show, onModalShow }) {
  const [userDetails, setUserDetails] = useState({});
  const [hasAccount, setHasAccount] = useState(true);

  const { onSignUp } = useUserContext();

  const OnSubmit = (e) => {
    e.preventDefault();
    let details = {};
    console.dir(e.target);
    Array.from(e.target).forEach((element) => {
      if (element.tagName === "INPUT") {
        const key = element.name;
        const value = element.value;
        details = { ...details, [key]: value };
      }
    });
    setUserDetails(details);
    onSignUp(details);
  };

  const onSignState = (e, off = !hasAccount) => {
    setHasAccount(off);
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h2>{hasAccount ? "Login Form" : "Signup Form"}</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={OnSubmit} className="d-flex flex-column">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
            <Form.Label htmlFor="password">Passowrd</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />

            {!hasAccount && (
              <>
                <Form.Label htmlFor="repassword">Re-Password</Form.Label>
                <Form.Control
                  type="password"
                  id="repassword"
                  name="repassword"
                  placeholder="Enter password again"
                  required
                />
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                />
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                />
                <Form.Label htmlFor="phone">Phone</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                />
              </>
            )}
            <div className="d-flex justify-content-center">
              <Button className="mt-3 w-25" type="submit">
                {hasAccount ? "Login" : "Sign Up"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between px-5">
          <a className="text-decoration-none" href="#" onClick={onSignState}>
            {!hasAccount ? "Have account" : "Dont have account"}
          </a>
          <Button
            className="px-4"
            onClick={(e) => {
              e.stopPropagation();
              onSignState(e, true);
              onModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignModal;
