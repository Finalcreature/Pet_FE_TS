import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserContext } from "../libs/UserContext";
import { MDBCheckbox } from "mdb-react-ui-kit";

function UserForm({ OnSubmit, hasAccount, changePass = true, onChangePass }) {
  const [userInputs, setUserInputs] = useState({});
  const { signError, userInfo, userId } = useUserContext();

  const onChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  console.log(userInputs);

  const onFormSubmit = (e) => {
    e.preventDefault();
    OnSubmit(userInputs);
  };

  const onEnableChange = (e) => {
    onChangePass(e.target.checked);
  };

  return (
    <Form onSubmit={onFormSubmit} className="d-flex flex-column">
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        onChange={(e) => onChange(e, userInputs)}
        // pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
        required
        defaultValue={userInfo.email}
      />

      {userId && (
        <>
          <MDBCheckbox
            label={"Change password"}
            name={"changePass"}
            id={"enablePassChange"}
            onChange={onEnableChange}
          />
        </>
      )}

      <Form.Label hidden={!changePass} htmlFor="password">
        Passowrd
      </Form.Label>
      <Form.Control
        // ref={password}
        type="password"
        id="password"
        name="password"
        placeholder={`Enter ${userId && "current"} password`}
        required={changePass}
        autoComplete="true"
        onChange={onChange}
        hidden={!changePass}
      />

      {!hasAccount && (
        <>
          {userId && (
            <>
              <Form.Label hidden={!changePass} htmlFor="newPass">
                New Password
              </Form.Label>
              <Form.Control
                hidden={!changePass}
                type="password"
                id="newPass"
                name="newPass"
                placeholder="Enter new password"
                required={changePass}
                autoComplete="true"
                onChange={onChange}
              />
            </>
          )}
          <>
            <Form.Label hidden={!changePass} htmlFor="repassword">
              Re-Password
            </Form.Label>
            <Form.Control
              hidden={!changePass}
              type="password"
              id="repassword"
              name="repassword"
              placeholder={`Enter ${userId && "new"} password again`}
              required={changePass}
              autoComplete="true"
              onChange={onChange}
            />
          </>

          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            required
            onChange={onChange}
            defaultValue={userInfo.firstName}
          />
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            required
            onChange={onChange}
            defaultValue={userInfo.lastName}
          />
          <Form.Label htmlFor="phone">Phone</Form.Label>
          <Form.Control
            type="tel"
            pattern="[0]{1}[0-9]{9}"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            required
            maxLength={10}
            onChange={onChange}
            defaultValue={userInfo.phone}
          />
        </>
      )}
      {signError.on && (
        <h5 className="text-center text-danger mt-2">{signError.message}</h5>
      )}
      <div className="d-flex justify-content-center">
        <Button className="mt-1 w-25" type="submit">
          {hasAccount ? "Login" : !userId ? "Sign Up" : "Edit"}
        </Button>
      </div>
    </Form>
  );
}

export default UserForm;
