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
import StarRatingComponent from 'react-star-rating-component';


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
                onePost.reviews?.length === 0 ? <p className="cart_empty" >No Reviews Yet</p> : onePost.reviews?.map((review) => (
                    <div className="review" key={review.id}>
                        <div className="the_author">
                            <div>
                                <img src={review.author_image ? review.author_image : defaultImage} alt="author_image" className="author_image" />
                                <h4 className="review_author">{review.author}</h4>
                            </div>
                            <div className="star_rating">
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    starColor={"#e7222e"}
                                    value={review.rating}
                                />
                            </div>
                        </div>
                        <p>{review.body}</p>
                        <Moment local date={review.created_at} fromNow className="moment"></Moment>
                    </div>
                )).reverse()
            }
        </div>
    )
}

export default ReviewPage;
