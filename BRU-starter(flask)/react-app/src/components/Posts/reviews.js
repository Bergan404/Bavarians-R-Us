import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'
import { addThePost } from '../../store/add_post'
import { findAllReviews } from '../../store/reviews'
import { findAllUsers } from '../../store/all_users'
import Moment from "react-moment";
import "moment-timezone";
import defaultImage from '../default_user.jpeg'


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
                <>
                    <div className="review">
                        <div className="the_author">
                            <img src={review.author_image ? review.author_image : defaultImage} alt="author_image" className="author_image"/>
                            <h4 className="review_author">{review.author}</h4>
                        </div>
                        <p>{review.body}</p>
                        {/* <Moment local date={review.created_at} format="hh:mm" tz="Atlantic/Reykjavik" /> */}
                        <Moment local date={review.created_at} fromNow className="moment"></Moment>
                    </div>
                </>
            )).reverse()
          }
        </div>
    )
}

export default ReviewPage;
