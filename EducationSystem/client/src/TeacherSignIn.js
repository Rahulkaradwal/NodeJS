import React, { useState } from "react";
import "./style.css";
import TeacherSignUp from "./TeacherSignUp";

export default function TeacherSignIn() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <div className="container">
      {showSignUp ? (
        <TeacherSignUp />
      ) : (
        <div>
          <h1>Sign in</h1>
          <form action="/signin" method="POST">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <p>
            Don't have an account?
            <button className="btn" onClick={handleSignUpClick}>
              SignUp
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
