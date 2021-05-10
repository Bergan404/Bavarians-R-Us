import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './login-signup.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signup_form" >
      <div className="signup_divs" >
        <label className="signup_labels" >User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          className="signup_inputs"
        ></input>
      </div>
      <div className="signup_divs">
        <label className="signup_labels">Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          className="signup_inputs"
        ></input>
      </div>
      <div className="signup_divs">
        <label className="signup_labels">Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          className="signup_inputs"
        ></input>
      </div>
      <div className="signup_divs">
        <label className="signup_labels">Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className="signup_inputs"
        ></input>
      </div>
      <button type="submit" className="signup_signup" >Sign Up</button>
    </form>
  );
};

export default SignUpForm;
