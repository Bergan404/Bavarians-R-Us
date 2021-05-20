import React from "react";
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import defaultImage from '../default_user.jpeg'

const ProfilePage = () => {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default ProfilePage;
