import Dropdown from 'react-bootstrap/Dropdown'
import React from "react";
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import defaultImage from '../default_user.jpeg'
import LogoutButton from '../auth/LogoutButton';


import './dropdown.css'

const DropDown = () => {
    const user = useSelector(state => state.session.user)

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown_image">
            <img src={user.image ? user.image : defaultImage} alt="author_image" className="dropdown_profile_image"/>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown_dropdown">
                <Dropdown.Item className="dropdown_item"><NavLink to={`/profile/${user.username}`} exact={true} activeClassName="active">
                  Profile
                </NavLink></Dropdown.Item>
                <Dropdown.Item className="dropdown_item"><LogoutButton /></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDown;
