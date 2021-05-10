import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';
import defaultImage from '../default_image.png'
import stripes from '../stripes.png'


import './discussions.css';


const AllDiscussions = () => {
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.discussion)

  console.log(discussions)

  useEffect(async () => {
    await dispatch(findAllDiscussions())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    // <img src={banner} alt="banner" className="banner_image"></img>
    <>
      <div>
        <img src={stripes} alt="stripes" className="stripes"/><h1 className="all_discussions_page" >All Discussions</h1>
          <div className="homepage_discussions_page">
            {
              discussions?.length && discussions.map((discussion) => (
                <div className="each_discussion">
                  <NavLink key={discussion.id} to={`/discussion/${discussion.id}`}>
                      <h3>{discussion.discussion_title}</h3>
                      <img src={discussion.image ? discussion.image : defaultImage}  alt="discussion-image"/>
                      <p>{discussion.body}</p>

                  </NavLink>
                </div>
              ))
            }
          </div>
      </div>
    </>
  )
}

export default AllDiscussions;
