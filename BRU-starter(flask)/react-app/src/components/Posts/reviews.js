import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { addThePost } from '../../store/add_post'
import { findAllReviews } from '../../store/reviews'
import { delExistingPost } from '../../store/post_create'



const ReviewPage = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const onePost = useSelector(state => state.onePost)
    const userId = useSelector(state => state.session.user.id)
    const reviews = useSelector(state => state.reviews)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOnePost(postId))
        await dispatch(findAllReviews(postId))
    }, [dispatch])


    return (
        <div>
            {
            reviews?.length && reviews.map((review) =>(
                <p>{review.body}</p>
            ))
          }
        </div>
    )
}

export default ReviewPage;
