import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from '../bmw-logo.png'

import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const categories = useSelector(state => state.categories.categories)

  console.log(categories)

  return (
    <nav className="nav_container">
      <div>
        <div className="nav_left">
          <NavLink to="/" exact={true} activeClassName="active" className="logo" >
            <img src={logo} alt='logo' className="logo-image" />
            <h1 className="logo-text" >Bravarians<p className="the-r">"R"</p>Us</h1>
          </NavLink>
        </div>
      </div>
      <div className="nav_right">
        {
          user ? " " :
          <>
          <div className="right-nav">
            <div className="right-components">
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div className="right-components">
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>
          </div>
          </>
        }
        {
          user ?
          <>
            <div className="right-nav" >
              <div className="right-components" >
                <NavLink to="/create-discussion" exact={true} activeClassName="active">
                  Discussion Creation
                </NavLink>
              </div>
              <div className="right-components" >
                <NavLink to="/create-post" exact={true} activeClassName="active">
                  Post Creation
                </NavLink>
              </div>
              <div className="right-components" >
                <LogoutButton />
              </div>
            </div>
          </>
          : " "
        }
      </div>
    </nav>
  );
}

export default NavBar;
