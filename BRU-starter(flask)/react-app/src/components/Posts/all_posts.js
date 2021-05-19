import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';
import defaultImage from '../default_image.png'
import stripes from '../stripes.png'

import './posts.css';


const AllPosts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  useEffect(async () => {
    await dispatch(findAllPosts())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    <>
      <div>
        <div className="posts_center"><img src={stripes} alt="stripes" className="stripes1" /><h1 className="all_posts_page">All Posts</h1></div>
        <div className="homepage_posts_page">
          {
            posts?.length && posts.map((post) => (
              <div className="each_post_page" key={post.id}>
                <NavLink key={post.id} to={`/posts/${post.id}`}>
                  <img src={post.image ? post.image : defaultImage} alt="post-image" />
                  <h3 className="post_title">{post.post_title}</h3>
                  <p>{post.description}</p>
                </NavLink>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default AllPosts;
