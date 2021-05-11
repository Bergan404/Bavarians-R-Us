import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import './login-signup.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("demo@aa.io","password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_background">
      <form onSubmit={onLogin} className="login_form" >
        <div>
          {errors.map((error) => (
            <div className="errors" >{error}</div>
          ))}
        </div>
        <div className="login_divs" >
          <label htmlFor="email" className="login_label" >Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
            className="login_input"
          />
        </div>
        <div className="login_divs">
          <label htmlFor="password" className="login_label" >Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
            className="login_input"
          />
        </div>
          <button type="submit" className="login_login" >Login</button>
          <button className="login-demo" onClick={handleDemo} type="submit">Demo Login</button>
          <div className="to_signup" >
            <NavLink to="/sign-up" exact={true} className="login_to_signup" >Don't have an account?</NavLink>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;
