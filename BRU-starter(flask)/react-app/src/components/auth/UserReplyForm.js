import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userReplyCreate } from '../../store/user_to_user_reply'

import './review_reply.css';

const UserReplyForm = ({replyId}) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState();

    const onUserReplyCreation = async (e) => {
        // e.preventDefault();
        await dispatch(userReplyCreate(body, replyId));
    }

    const updateBody = (e) => {
        setBody(e.target.value);
    }


    return (
        <form onSubmit={onUserReplyCreation}>
            <div className='server_div'>
                <textarea value={body} onChange={updateBody} className="reply_text"/>
            </div>
            <div className="create">
                <button className="reply-button" type="submit">Create Reply</button>
            </div>
        </form>
    )
}

export default UserReplyForm;
