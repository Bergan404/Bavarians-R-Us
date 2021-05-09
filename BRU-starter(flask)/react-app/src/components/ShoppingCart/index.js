import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { delExistingPost } from '../../store/post_create'



const ShoppingCart = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const onePost = useSelector(state => state.onePost)
    const userId = useSelector(state => state.session.user.id)

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
        </>
    )
}

export default ShoppingCart;
