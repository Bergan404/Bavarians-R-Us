import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'



const PostPage = (props) => {
    const dispatch = useDispatch()
    let id = Number(window.location.pathname.slice(6))
    const oneDiscussion = useSelector(state => state.oneDiscussion)
    const create = useSelector(state => state.createPost)

    const { discussionId } = useParams();


    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOneDiscussion(discussionId))
    }, [dispatch])

    return (
        <>
            <h1>{oneDiscussion.discussion_title}</h1>
            <img src={oneDiscussion.image}></img>
            <p>{oneDiscussion.body}</p>
        </>
    )
}

export default PostPage;
