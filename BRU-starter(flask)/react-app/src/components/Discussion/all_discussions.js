import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'
import { NavLink } from 'react-router-dom';


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
        <h2>All Discussions</h2>
          {
            discussions?.length && discussions.map((discussion) => (
              <NavLink key={discussion.id} to={`/discussion/${discussion.id}`}>
                  <h3>{discussion.discussion_title}</h3>
                  <p>{discussion.body}</p>

              </NavLink>
            ))
          }
      </div>
    </>
  )
}

export default AllDiscussions;
