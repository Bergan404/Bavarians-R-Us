import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    history.push("/")
    await dispatch(logout());
  };

  return <button onClick={onLogout} className="logout_button" >Logout</button>;
};

export default LogoutButton;
