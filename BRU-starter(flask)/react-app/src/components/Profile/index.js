import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { findAllCategories } from '../../store/category'
import { authenticate } from '../../store/session'
import defaultImage from '../default_image.png'
import ShippingForm from '../auth/ShippingForm'
import stripes from '../stripes.png'

import './profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const sessionUserPosts = useSelector(state => state.session.user.posts)
    const sessionUserDiscussions = useSelector(state => state.session.user.discussions)

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(authenticate())
    }, [dispatch])

    return (
        <>
            <h1 className="profile_username" >Welcome, {sessionUser.username}!</h1>
            <div className="profile_outerwrapper" >
                <div>
                    <div className="search_div" >
                        <img src={stripes} alt="stripes" className="search_stripes" />
                        <h1 className="search_posts" >Shipping Information</h1>
                    </div>
                    <div className="profile_form_div" >
                        <ShippingForm />
                    </div>
                </div>
                <div>
                    <div className="search_div" >
                        <img src={stripes} alt="stripes" className="search_stripes" />
                        <h1 className="search_posts" >Your Posts</h1>
                    </div>
                    <div className="profile_posts_page">
                        {
                            sessionUserPosts?.length === 0 ? <p className="cart_empty" >No Posts Yet</p> : sessionUserPosts.map((post) => (
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
                        <div className="search_div" >
                            <img src={stripes} alt="stripes" className="search_stripes" />
                            <h1 className="search_posts" >Your Discussions</h1>
                        </div>
                    <div className="profile_discussions_page">
                        {
                            sessionUserDiscussions?.length === 0 ? <p className="cart_empty" >No Discussions Yet</p> : sessionUserDiscussions.map((discussion) => (
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
