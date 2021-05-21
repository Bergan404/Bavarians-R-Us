import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { addThePost } from '../../store/add_post';
import defaultImage from '../default_image.png'

const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const addThePost = useSelector(state => state.addThePost)
    const userId = useSelector(state => state.session.user.id)
    let total = 0;
    if (addThePost) {
        const itemTotal = addThePost.forEach(item => {
            let itemPrice = item.price.slice(1);
            total = total + +itemPrice
            return total
        })
    }

    useEffect(async () => {
        await dispatch(findAllCategories())
    }, [dispatch])

    return (
        <>
            <h1 className="checkout_header" >Thank You For Your Purchase {user.username}!</h1>
            <div className="checkout_posts" >
                {
                    addThePost?.length === 0 ? <p className="cart_empty" >Your Cart Was Empty</p> : addThePost.map((post) => (
                        <div className="each_post_checkout" key={post.id}>
                            <NavLink key={post.id} to={`/posts/${post.id}`}>
                                <img src={post.image ? post.image : defaultImage} alt="post-image" />
                                <h3 className="post_title">{post.post_title}</h3>
                                <p>{post.description}</p>

                            </NavLink>
                        </div>
                    ))
                }
            </div>
            <h3 className="checkout_total">Grand Total: ${total}</h3>
        </>
    )
}


export default Checkout;
