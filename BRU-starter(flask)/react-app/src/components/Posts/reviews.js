import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { addThePost } from '../../store/add_post'
import { findAllReviews } from '../../store/reviews'
import { findAllUsers } from '../../store/all_users'




const ReviewPage = (props) => {
    const dispatch = useDispatch()
    const onePost = useSelector(state => state.onePost)
    const allUsers = useSelector(state => state.allUsers)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllUsers())
        await dispatch(findAllCategories())
        await dispatch(findOnePost(postId))
        await dispatch(findAllReviews(postId))
    }, [dispatch])


    return (
        <div>
            {
            onePost.reviews?.length && onePost.reviews.map((review) =>(
                <div className="review">
                    <p>{review.body}</p>
                </div>
            ))
          }
        </div>
    )
}

export default ReviewPage;
