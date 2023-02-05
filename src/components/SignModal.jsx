import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import UserForm from "./UserForm";
import { useUserContext } from "../libs/UserContext";

function SignModal({ show, onModalShow }) {
  const [hasAccount, setHasAccount] = useState(true);

  const { onSignUp, onSignIn, onErrorReset, onError } = useUserContext();

  const SignUp = async (userDetails) => {
    if (userDetails.password !== userDetails.repassword) {
      console.log("NOT MATCH");
      onError(400, "Passwords don't match");
      return;
    }

    const user = await onSignUp(userDetails);

    user.password = userDetails.password;
    user && SignIn(user);
  };

  const SignIn = async (userDetails) => {
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
        <Modal.Header className="main-blue">
          <h2>{hasAccount ? "Login Form" : "Signup Form"}</h2>
        </Modal.Header>
        <Modal.Body className="main-blue">
          <UserForm OnSubmit={OnSubmit} hasAccount={hasAccount} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between px-5 main-blue">
          <button
            className="text-decoration-none bg-orange rounded p-2 border-none"
            onClick={onSignState}
          >
            {!hasAccount ? "Have account" : "Dont have account"}
          </button>
          <Button
            variant="none"
            className="px-4 bg-dark rounded p-2"
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
