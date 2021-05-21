import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Moment from "react-moment";
import "moment-timezone";
import defaultImage from '../default_user.jpeg'
import { delExistingReply } from '../../store/reply_create'
import UserReplyForm from '../auth/UserReplyForm'
import UserReplyPage from '../Discussion/user_to_user_reply'


const RepliesPage = ({reply}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [reveal, setReveal] = useState(false)

    const handleReplyDelete = async (e, replyId) => {
		dispatch(delExistingReply(replyId));
        window.location.reload(false);
	};


    return (
        <div>
            <div className="replies" >
                <div className="the_author">
                    <div>
                        <img src={reply.author_image ? reply.author_image : defaultImage} alt="author_image" className="author_image"/>
                        <h4 className="review_author">{reply.author}</h4>
                    </div>
                    <div>
                        {reply.userId === userId?<button className="delete-button" onClick={(e) => handleReplyDelete(e, reply.id)} >Delete</button>: null}
                    </div>
                </div>
                <p>{reply.body}</p>
                <Moment local fromNow tz="Atlantic/Reykjavik" className="moment">{reply.created_at}</Moment>
                <br></br>
                <button onClick={() => setReveal(!reveal)} className="show_reply" >Reply</button>
                {
                    reveal && <UserReplyForm replyId={reply.id} />
                }
                <div>
                    <UserReplyPage reply={reply} />
                </div>
            </div>
        </div>
    )
}

export default RepliesPage;
