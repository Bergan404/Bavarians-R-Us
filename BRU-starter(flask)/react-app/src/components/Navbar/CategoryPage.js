import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { findOneCategory } from '../../store/oneCategory';

import './navbar.css'

const CategoryPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const categoryInfo = useSelector(state => state.oneCategory)
    const categoryPosts = useSelector(state => state.oneCategory.posts)

    const { categoryId } = useParams();

    useEffect(async () => {
        await dispatch(findOneCategory(categoryId))
    }, [dispatch])


    return (
        <>
            <div>
                <h1>{categoryInfo.category}</h1>
            </div>
            <div>
                {
                    categoryPosts?.length && categoryPosts.map((post) => (
                    <NavLink key={post.id} to={`/posts/${post.id}`}>
                        <h3>{post.post_title}</h3>
                        <p>{post.description}</p>

                    </NavLink>
                    ))
                }
            </div>
        </>
    );
}

export default CategoryPage;
