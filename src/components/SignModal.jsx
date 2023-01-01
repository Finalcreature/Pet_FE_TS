import React, { useState } from "react";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../libs/UserContext";

function SignModal({ show, onModalShow }) {
  const [hasAccount, setHasAccount] = useState(true);

  const email = useRef();
  const password = useRef();
  const rePassword = useRef();

  const { onSignUp, onSignIn, signError, onErrorReset, onError } =
    useUserContext();

  const SignUp = (e) => {
    if (password.current.value !== rePassword.current.value) {
      console.log("NOT MATCH");
      onError(400, "Passwords don't match");
      return;
    }
    let userDetails = {};
    Array.from(e.target).forEach((element) => {
      if (element.tagName === "INPUT") {
        const key = element.name;
        const value = element.value;
        userDetails = { ...userDetails, [key]: value };
      }
    });
    onSignUp(userDetails);
  };

  const SignIn = async () => {
    const userEmail = email.current.value;
    const userPass = password.current.value;
    const userDetails = { email: userEmail, password: userPass };
    const isConnected = await onSignIn(userDetails);
    isConnected && onModalShow(false);
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    onErrorReset();

    if (!hasAccount) {
      SignUp(e);
      return;
    }

    SignIn(e);
  };

  const onSignState = (e, off = !hasAccount) => {
    onErrorReset();
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
              ref={email}
            />
            <Form.Label htmlFor="password">Passowrd</Form.Label>
            <Form.Control
              ref={password}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              autoComplete="true"
            />

            {!hasAccount && (
              <>
                <Form.Label htmlFor="repassword">Re-Password</Form.Label>
                <Form.Control
                  type="password"
                  id="repassword"
                  name="repassword"
                  ref={rePassword}
                  placeholder="Enter password again"
                  required
                  autoComplete="true"
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
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  required
                />
              </>
            )}
            {signError.on && (
              <h5 className="text-center text-danger mt-2">
                {signError.message}
              </h5>
            )}
            <div className="d-flex justify-content-center">
              <Button className="mt-1 w-25" type="submit">
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
              onErrorReset();
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
