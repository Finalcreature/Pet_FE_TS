import React, { useState } from "react";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../libs/UserContext";
import UserForm from "./UserForm";

function SignModal({ show, onModalShow }) {
  const [hasAccount, setHasAccount] = useState(true);

  // const email = useRef();
  // const password = useRef();
  // const rePassword = useRef();

  const { onSignUp, onSignIn, signError, onErrorReset, onError } =
    useUserContext();

  const SignUp = async (userDetails) => {
    console.log("FORM", userDetails);
    if (userDetails.password !== userDetails.repassword) {
      console.log("NOT MATCH");
      onError(400, "Passwords don't match");
      return;
    }
    // if (password.current.value !== rePassword.current.value) {

    // const userDetails = {};
    // Array.from(e.target).forEach((element) => {
    //   if (element.tagName === "INPUT") {
    //     const key = element.name;
    //     const value = element.value;
    //     // userDetails = { ...userDetails, [key]: value };
    //     userDetails[key] = value;
    //   }
    // });
    const user = await onSignUp(userDetails);
    user && SignIn();
  };

  const SignIn = async (userDetails) => {
    // const userEmail = email.current.value;
    // const userPass = password.current.value;
    // const userDetails = { email: userEmail, password: userPass };
    const isConnected = await onSignIn(userDetails);
    isConnected && onModalShow(false);
  };

  const OnSubmit = (userDetails) => {
    onErrorReset();
    if (!hasAccount) {
      SignUp(userDetails);
      return;
    }

    SignIn(userDetails);
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
          <UserForm OnSubmit={OnSubmit} hasAccount={hasAccount} />
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
