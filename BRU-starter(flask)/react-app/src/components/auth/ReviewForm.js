import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { reviewCreate } from '../../store/review_create'
import { findOnePost } from '../../store/onePost'
import StarRatingComponent from 'react-star-rating-component';

import './review_reply.css';

const ReviewForm = () => {
    const dispatch = useDispatch();
    const [body, setBody] = useState();
    const [rating, setRating] = useState(1)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findOnePost(postId))
    }, [dispatch])


    const onReviewCreation = async (e) => {
        await dispatch(reviewCreate(rating, body, postId));

    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }

    const onStarClick = (e) => {
        setRating(e);
      }


    return (
        <form onSubmit={onReviewCreation}>
            <div className='server_div'>
                <label className="review_label">Leave a Review</label>
                <div className="review_rating">
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={rating}
                        onStarClick={onStarClick}
                        starColor={"#e7222e"}
                    />
                </div>
                <textarea value={body} onChange={updateBody} className="review_text" />
            </div>
            <div className="create">
                <button className="review-button" type="submit">Create Review</button>
            </div>
        </form>
    )
}

export default ReviewForm;
