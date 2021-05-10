import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'
import { delExistingDiscussion } from '../../store/discussion_create'
import ReplyPage from './replies'


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
        <>
            {oneDiscussion.userId === userId?<button className="delete-button" onClick={handleDelete} >Delete</button>: null}
            <h1>{oneDiscussion.discussion_title}</h1>
            <img src={oneDiscussion.image}></img>
            <p>{oneDiscussion.body}</p>
            <hr></hr>
            <div>
                <ReplyPage />
            </div>
        </>
    )
}

export default PostPage;
