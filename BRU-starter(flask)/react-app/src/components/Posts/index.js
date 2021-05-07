import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';


const PostPage = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)

    console.log(posts)

    useEffect(async () => {
        await dispatch(findAllCategories())
    }, [dispatch])


    return (
        // <img src={banner} alt="banner" className="banner_image"></img>
        <>
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
