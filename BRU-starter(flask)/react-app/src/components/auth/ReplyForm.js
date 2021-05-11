import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { replyCreate } from '../../store/reply_create'
import { findOneDiscussion } from '../../store/oneDiscussion'

import './review_reply.css';


const ReplyForm = () => {
    const dispatch = useDispatch();
    const [body, setBody] = useState();

    const { discussionId } = useParams();

    useEffect(async () => {
        await dispatch(findOneDiscussion(discussionId))
    }, [dispatch])


    const onReplyCreation = async (e) => {
        // e.preventDefault();
        await dispatch(replyCreate(body, discussionId));

    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }


    return (
        <form onSubmit={onReplyCreation}>
            <div className='server_div'>
                <label className="reply_label">Leave a Reply</label>
                <textarea value={body} onChange={updateBody} className="reply_text"/>
            </div>
            <div className="create">
                <button className="reply-button" type="submit">Create Review</button>
            </div>
        </form>
    )
}

export default ReplyForm;