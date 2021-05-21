import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import defaultImage from '../default_image.png'
import ShippingForm from '../auth/ShippingForm'

import './profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const sessionUserPosts = useSelector(state => state.session.user.posts)
    const sessionUserDiscussions = useSelector(state => state.session.user.discussions)

    useEffect(async () => {
        await dispatch(findAllCategories())
        if (sessionUser) {
            dispatch(findAllPosts(sessionUser.id))
        }
    }, [sessionUser, dispatch])

    return (
        <>
            <h1 className="profile_username" >Welcome, {sessionUser.username}!</h1>
            <div className="profile_outerwrapper" >
                <div>
                    <h2 className="profile_divs" >Shipping Information</h2>
                    <ShippingForm />
                </div>
                <div>
                    <h2 className="profile_divs" >Posts</h2>
                    <div className="profile_posts_page">
                        {
                            sessionUserPosts?.length && sessionUserPosts.map((post) => (
                                <div className="each_post_profile" key={post.id}>
                                    <NavLink key={post.id} to={`/posts/${post.id}`}>
                                        <img src={post.image ? post.image : defaultImage} alt="post-image" />
                                        <h3 className="post_title">{post.post_title}</h3>
                                        <p>{post.description}</p>
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                    <h2 className="profile_divs1" >Discussions</h2>
                    <div className="profile_discussions_page">
                        {
                            sessionUserDiscussions?.length && sessionUserDiscussions.map((discussion) => (
                                <div className="each_discussion_profile" key={discussion.id}>
                                    <NavLink key={discussion.id} to={`/discussion/${discussion.id}`}>
                                        <h3 className="discussion_title">{discussion.discussion_title}</h3>
                                        <img src={discussion.image ? discussion.image : defaultImage} alt="discussion-image" />
                                        <p>{discussion.body}</p>
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;
