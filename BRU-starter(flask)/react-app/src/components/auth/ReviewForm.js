import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { reviewCreate } from '../../store/review_create'
import { findOnePost } from '../../store/onePost'

import './review_reply.css';

const ReviewForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([]);
    const [body, setBody] = useState();

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findOnePost(postId))
    }, [dispatch])


    const onReviewCreation = async (e) => {
        // e.preventDefault();
        await dispatch(reviewCreate(body, postId));

    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }


    return (
        <form onSubmit={onReviewCreation}>
            <div className='server_div'>
                <label className="review_label">Leave a Review</label>
                <textarea value={body} onChange={updateBody} className="review_text" />
            </div>
            <div className="create">
                <button className="review-button" type="submit">Create Review</button>
            </div>
        </form>
    )
}

export default ReviewForm;
