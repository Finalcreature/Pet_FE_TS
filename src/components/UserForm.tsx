import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserContext } from "../libs/UserContext";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { NewUser } from "../interfaces/user_interface";

interface UserFormProps {
  OnSubmit: (input: any) => any;
  hasAccount?: boolean;
  changePass?: boolean;
  onChangePass?: (isEnabled: boolean) => any;
}

function UserForm({
  OnSubmit,
  hasAccount,
  changePass = true,
  onChangePass,
}: UserFormProps) {
  const [userInputs, setUserInputs] = useState<Partial<NewUser>>({});
  const { signError, userInfo, userId } = useUserContext();

  console.log(userInputs);

  const onChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setUserInputs({ ...userInputs, [target.name]: target.value });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    OnSubmit(userInputs);
  };

  const onEnableChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    onChangePass!(target.checked);
  };

  return (
    <Form onSubmit={onFormSubmit} className="d-flex flex-column ">
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        onChange={(e) => onChange(e)}
        // pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
        required
        defaultValue={userInfo ? userInfo.email : ""}
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
        // minLength={6}
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
                // minLength={6}

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
            defaultValue={userInfo ? userInfo.firstName : ""}
          />
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            required
            onChange={onChange}
            defaultValue={userInfo ? userInfo.lastName : ""}
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
            defaultValue={userInfo ? userInfo.phone : ""}
          />
        </>
      )}
      {signError!.on && (
        <h5 className="text-center text-danger mt-2 bg-light">
          {signError!.message}
        </h5>
      )}
      <div className="d-flex justify-content-center">
        <Button
          variant="none"
          className="mt-1 w-25 bg-orange rounded p-2 mt-3 text-light"
          type="submit"
        >
          {hasAccount ? "Login" : !userId ? "Sign Up" : "Edit"}
        </Button>
      </div>
    </Form>
  );
}

export default UserForm;
