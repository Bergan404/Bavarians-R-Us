import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { delExistingPost } from '../../store/post_create'
import { addThePost } from '../../store/add_post';
import defaultImage from '../default_image.png'


import './shoppingcart.css'

const ShoppingCart = () => {
    const dispatch = useDispatch()
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

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        // await dispatch(findOnePost(postId))
    }, [dispatch])

    return (
        <>
            <h1 className="cart_header" >Shopping Cart</h1>
            <div className="cart_posts" >
                {
                    addThePost?.length === 0 ? <p className="cart_empty" >Cart Is Empty</p> : addThePost.map((post) => (
                    <div className="each_post" key={post.id}>
                        <NavLink key={post.id} to={`/posts/${post.id}`}>
                            <img src={post.image ? post.image : defaultImage}  alt="post-image" />
                            <h3 className="post_title">{post.post_title}</h3>
                            <p>{post.description}</p>

                        </NavLink>
                    </div>
                    ))
                }
            </div>
            <h3 className="header">Total: ${total}</h3>
        </>
    )
}


export default ShoppingCart;
