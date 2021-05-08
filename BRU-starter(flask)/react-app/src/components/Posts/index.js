import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'



const PostPage = (props) => {
    const dispatch = useDispatch()
    const onePost = useSelector(state => state.onePost)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOnePost(postId))
    }, [dispatch])

    return (
        <>
            <h1>{onePost.post_title}</h1>
            <img src={onePost.image}></img>
            <p>{onePost.description}</p>
            <p>{onePost.year}, {onePost.model}</p>
            <p>{onePost.price}</p>
            <p>{onePost.in_stock}</p>
            <p>{onePost.new_used}</p>
            <p>{onePost.categoryId}</p>
        </>
    )
}

export default PostPage;
