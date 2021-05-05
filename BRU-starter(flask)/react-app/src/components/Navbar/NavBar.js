import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className="nav_container">
      <div>
        <div className="nav_left">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
      </div>
      <div className="nav_right">
        {
          user ? " " :
          <>
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
          </>
        }
        {
          user ?
            <div>
              <LogoutButton />
            </div>
          : " "
        }
      </div>
    </nav>
  );
}

export default NavBar;