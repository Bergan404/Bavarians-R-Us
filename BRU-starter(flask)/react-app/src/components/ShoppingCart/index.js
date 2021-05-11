import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { delExistingPost } from '../../store/post_create'
import { addThePost } from '../../store/add_post';

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
        await dispatch(findOnePost(postId))
    }, [dispatch])

    // const handleDelete = async (e) => {
	// 	e.preventDefault();
	// 	dispatch(delExistingPost(onePost.id));
	// 	await history.push("/");
	// };

    return (
        <>
            <h1>Shopping Cart</h1>
            {
                addThePost?.length && addThePost.map((post) => (
                <NavLink key={post.id} to={`/posts/${post.id}`}>
                    <h3>{post.post_title}</h3>
                    <p>{post.description}</p>

                </NavLink>
                ))
            }
            <h3 className="header">Total: ${total}</h3>
        </>
    )
}


export default ShoppingCart;
