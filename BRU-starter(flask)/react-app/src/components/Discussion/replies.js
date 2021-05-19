import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'
import { delExistingDiscussion } from '../../store/discussion_create'
import Moment from "react-moment";
import "moment-timezone";
import defaultImage from '../default_user.jpeg'
import { delExistingReply } from '../../store/reply_create'
import UserReplyForm from '../auth/UserReplyForm'
import UserReplyPage from './user_to_user_reply'


const ReplyPage = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const oneDiscussion = useSelector(state => state.oneDiscussion)
    const userId = useSelector(state => state.session.user.id)
    const [showResults, setShowResults] = useState(false)
    const [reveal, setReveal] = useState(false)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOneDiscussion(postId))
    }, [dispatch])

    const handleReplyDelete = async (e, replyId) => {
		// e.preventDefault();
		dispatch(delExistingReply(replyId));
		// await history.push(`/discussion/${oneDiscussion.id}`);
        window.location.reload(false);
	};


    return (
        <div>
            {
            oneDiscussion.replies?.length  === 0 ? <p className="cart_empty" >No Replies Yet</p> : oneDiscussion.replies?.map((reply) =>(
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
                    <button onClick={() => setReveal(!reveal)}>Reply</button>
                    {
                        reveal && <UserReplyForm replyId={reply.id} />
                    }
                    <div>
                        <UserReplyPage reply={reply} />
                    </div>
                </div>
            )).reverse()
          }
        </div>
    )
}

export default ReplyPage;
