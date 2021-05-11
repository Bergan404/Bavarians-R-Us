import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { findOneCategory } from '../../store/oneCategory';
import defaultImage from '../default_image.png'


import './navbar.css'

const CategoryPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const categoryInfo = useSelector(state => state.oneCategory)
    const categoryPosts = useSelector(state => state.oneCategory.posts)

    const { categoryId } = useParams();

    useEffect(async () => {
        await dispatch(findOneCategory(categoryId))
    }, [dispatch, categoryId])


    return (
        <>
            <div>
                <h1 className="category_header" >{categoryInfo.category}</h1>
            </div>
            <div className="homepage_posts_page">
                {
                    categoryPosts?.length && categoryPosts.map((post) => (
                    <div className="each_post">
                        <NavLink key={post.id} to={`/posts/${post.id}`}>
                            <img src={post.image ? post.image : defaultImage} alt="post-image" />
                            <h3 className="post_title">{post.post_title}</h3>
                            <p>{post.description}</p>

                        </NavLink>
                    </div>
                    ))
                }
            </div>
        </>
    );
}

export default CategoryPage;
