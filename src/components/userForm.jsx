import React from "react";

function userForm() {
  return (
    <Form onSubmit={OnSubmit} className="d-flex flex-column">
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        // pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
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
            pattern="[0]{1}[0-9]{9}"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            required
            maxLength={10}
          />
        </>
      )}
      {signError.on && (
        <h5 className="text-center text-danger mt-2">{signError.message}</h5>
      )}
      <div className="d-flex justify-content-center">
        <Button className="mt-1 w-25" type="submit">
          {hasAccount ? "Login" : "Sign Up"}
        </Button>
      </div>
    </Form>
  );
}

export default userForm;
