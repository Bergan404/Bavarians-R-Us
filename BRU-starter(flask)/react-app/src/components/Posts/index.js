import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { addThePost } from '../../store/add_post'
import { findAllReviews } from '../../store/reviews'
import { delExistingPost } from '../../store/posts'
import ReviewPage from './reviews'
import ReviewForm from '../auth/ReviewForm'
import defaultImage from '../default_image.png'



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

        dispatch(addThePost(parseInt(postId)))
        history.push(`/cart/${userId}`)
    }

    const handleDelete = async (e) => {
		e.preventDefault();
		dispatch(delExistingPost(onePost.id));
		await history.push("/");
	};

    return (
        <div className="post_page" >
            {onePost.userId === userId?<button className="delete-button" onClick={handleDelete} >Delete</button>: null}
            <h1>{onePost.post_title}</h1>
            <img src={onePost.image ? onePost.image : defaultImage} alt="post_image" className="post_image"></img>
            <div className="post_properties">
                <p className="post_description">{onePost.description}</p>
                <p><strong>Year:</strong> {onePost.year}, <strong>Model:</strong> {onePost.model}</p>
                <p className="post_price">{onePost.price}</p>
                <p className="post_stock">{onePost.in_stock}</p>
                {/* <p>{onePost.new_used}</p>
                <p>{onePost.categoryId}</p> */}
                <button className="add-to-cart-button" onClick={handleCartAdd} >Add To Cart</button>
            </div>

            <div className="post_review_create">
                <ReviewForm />
            </div>

            <div className="post_review">
                <ReviewPage />
            </div>
        </div>
    )
}

export default PostPage;
