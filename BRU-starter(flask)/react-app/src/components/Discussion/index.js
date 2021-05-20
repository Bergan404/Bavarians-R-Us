import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'
import { delExistingDiscussion } from '../../store/discussions'
import ReplyPage from './replies'
import ReplyForm from '../auth/ReplyForm'
import defaultImage from '../default_image.png'


const PostPage = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const oneDiscussion = useSelector(state => state.oneDiscussion)
    const userId = useSelector(state => state.session.user.id)

    const { discussionId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOneDiscussion(discussionId))
    }, [dispatch])

    const handleDelete = async (e) => {
		e.preventDefault();
		dispatch(delExistingDiscussion(oneDiscussion.id));
		await history.push("/");
	};

    return (
        <div className="discussion_page">
            <div className="post_delete">
                <h4 className="post_author">{oneDiscussion.author}</h4>{oneDiscussion.userId === userId?<button className="delete-button" onClick={handleDelete} >Delete</button>: null}
            </div>
            <h1>{oneDiscussion.discussion_title}</h1>
            <img src={oneDiscussion.image ? oneDiscussion.image : defaultImage} alt="discussion_image" className="discussion_image"></img>
            <p className="discussion_body">{oneDiscussion.body}</p>
            {/* <hr></hr> */}

            <div className="discussion_reply_create">
                <ReplyForm />
            </div>

            <div>
                <ReplyPage />
            </div>
        </div>
    )
}

export default PostPage;
