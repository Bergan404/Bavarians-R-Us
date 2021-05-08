import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'



const PostPage = (props) => {
    const dispatch = useDispatch()
    const create = useSelector(state => state.createPost)



    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOnePost())
    }, [dispatch])

    return (
        // <img src={banner} alt="banner" className="banner_image"></img>
        <>
            <h1>Post Page</h1>
            {/* <div>
            {
                posts?.length && posts.map((post) => (
                <NavLink key={post.id} to={`/posts/${post.id}`}>
                    <h3>{post.post_title}</h3>
                    <p>{post.description}</p>

                </NavLink>
                ))
            }
            </div> */}
            {/* <h2>{posts.post_title}</h2>
            <img src={posts.image}></img>
            <p>{posts.description}</p>
            <p>{posts.year}, {posts.model}</p>
            <p>{posts.price}</p>
            <p>{posts.in_stock}</p>
            <p>{posts.new_used}</p>
            <p>{posts.categoryId}</p> */}
        </>
    )
}

export default PostPage;
