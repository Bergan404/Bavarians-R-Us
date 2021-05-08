import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useParams } from 'react-router-dom';
import { findOnePost } from '../../store/onePost'



const PostPage = (props) => {
    const dispatch = useDispatch()
    const [post, setPost] = useState({})

    const { postId } = useParams();

    useEffect(() => {
        if (!postId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/users/${postId}`);
            const user = await response.json();
            setPost(post);
        })();
    }, [postId]);

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOnePost())
    }, [dispatch])

    return (
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
            <h2>{post.post_title}</h2>
            <img src={post.image}></img>
            <p>{post.description}</p>
            <p>{post.year}, {post.model}</p>
            <p>{post.price}</p>
            <p>{post.in_stock}</p>
            <p>{post.new_used}</p>
            <p>{post.categoryId}</p>
        </>
    )
}

export default PostPage;
