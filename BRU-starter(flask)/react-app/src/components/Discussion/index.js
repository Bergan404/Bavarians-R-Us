import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';
import { findAllPosts } from '../../store/posts'



const PostPage = (props) => {
    const dispatch = useDispatch()
    let id = Number(window.location.pathname.slice(6))
    const posts = useSelector(state => state.posts)
    const create = useSelector(state => state.createPost)

    console.log(posts)

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findAllPosts())
    }, [dispatch])

    return (
        // <img src={banner} alt="banner" className="banner_image"></img>
        <>
            <h1>Discussion page</h1>
            <h2>{posts.post_title}</h2>
            <img src={posts.image}></img>
            <p>{posts.description}</p>
            <p>{posts.year}, {posts.model}</p>
            <p>{posts.price}</p>
            <p>{posts.in_stock}</p>
            <p>{posts.new_used}</p>
            <p>{posts.categoryId}</p>
        </>
    )
}

export default PostPage;
