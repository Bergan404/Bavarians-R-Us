import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { addThePost } from '../../store/add_post'
import { findAllReviews } from '../../store/reviews'
import { delExistingPost } from '../../store/post_create'
import ReviewPage from './reviews'



const PostPage = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const onePost = useSelector(state => state.onePost)
    const userId = useSelector(state => state.session.user.id)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOnePost(postId))
        await dispatch(findAllReviews(postId))
    }, [dispatch])

    const handleCartAdd = (e) => {
        e.preventDefault();

        dispatch(addThePost(postId))
        history.push(`/cart/${userId}`)
    }

    const handleDelete = async (e) => {
		e.preventDefault();
		dispatch(delExistingPost(onePost.id));
		await history.push("/");
	};

    return (
        <>
            {onePost.userId === userId?<button className="delete-button" onClick={handleDelete} >Delete</button>: null}
            <h1>{onePost.post_title}</h1>
            <img src={onePost.image}></img>
            <p>{onePost.description}</p>
            <p>{onePost.year}, {onePost.model}</p>
            <p>{onePost.price}</p>
            <p>{onePost.in_stock}</p>
            <p>{onePost.new_used}</p>
            <p>{onePost.categoryId}</p>
            <button className="add-to-cart-button" onClick={handleCartAdd} >Add To Cart</button>

            <ReviewPage />
        </>
    )
}

export default PostPage;
