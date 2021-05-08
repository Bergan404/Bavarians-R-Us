import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import banner from '../bmw-banner.jpeg'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';



const AllPosts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  console.log(posts)

  useEffect(async () => {
    await dispatch(findAllPosts())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    // <img src={banner} alt="banner" className="banner_image"></img>
    <>
      <div>
        <h2>All Posts</h2>
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

export default AllPosts;
