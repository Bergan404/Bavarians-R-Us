import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import banner from '../bmw-banner.jpeg'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';


import './homepage.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.discussion)
  const posts = useSelector(state => state.posts)

  console.log(discussions)
  console.log(posts)

  useEffect(async () => {
    await dispatch(findAllDiscussions())
    await dispatch(findAllPosts())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    // <img src={banner} alt="banner" className="banner_image"></img>
    <>
      <h1>beans</h1>
      <div>
        <h2>Discussions</h2>
          {
            discussions?.length && discussions.map((discussion) => (
              <NavLink key={discussion.id} to={`/discussion/${discussion.id}`}>
                  <h3>{discussion.discussion_title}</h3>
                  <p>{discussion.body}</p>

              </NavLink>
            ))
          }
      </div>
      <div>
        <h2>Posts</h2>
          {
            posts?.length && posts.map((post) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
                  <h3>{post.post_title}</h3>
                  <p>{post.description}</p>

              </NavLink>
            ))
          }
      </div>
    </>
  )
}

export default HomePage;
