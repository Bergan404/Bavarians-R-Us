import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory } from 'react-router-dom';
import banner1 from '../site_banner.png'
import defaultImage from '../default_image.png'
import stripes from '../stripes.png'

import './homepage.css'

const HomePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const discussions = useSelector(state => state.discussion)
  const posts = useSelector(state => state.posts)

  useEffect(async () => {
    await dispatch(findAllDiscussions())
    await dispatch(findAllPosts())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    <div>
      <img src={banner1} alt="banner" className="banner_image"></img>
      <div className='dis_post_container' >
        <div>
          <NavLink to='/discussions' className="all_discussions" ><img src={stripes} alt="stripes"/><h2>Discussions</h2></NavLink>
            <div className="homepage_discussions" >
              {
                discussions?.length && discussions.slice(0, 6).map((discussion) => (
                  <div className="each_discussion" key={discussion.id}>
                    <NavLink key={discussion.id} to={`/discussion/${discussion.id}`} >
                        <h3 className="discussion_title" >{discussion.discussion_title}</h3>
                        <img src={discussion.image ? discussion.image : defaultImage}  alt="discussion-image"/>
                        <p>{discussion.body}</p>

                    </NavLink>
                  </div>
                ))
              }
            </div>
        </div>
        <div className="homepage_custom-styling">
          <NavLink to='/posts' className="all_posts" ><img src={stripes} alt="stripes"/><h2>Posts</h2></NavLink>
            <div className="homepage_posts" >
              {
                posts?.length && posts.slice(0, 3).map((post) => (
                  <div className="each_post" key={post.id}>
                    <NavLink key={post.id} to={`/posts/${post.id}`}>
                        <img src={post.image ? post.image : defaultImage}  alt="post-image" />
                        <h3 className="post_title" >{post.post_title}</h3>
                        <p>{post.description}</p>

                    </NavLink>
                  </div>
                )).reverse()
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
