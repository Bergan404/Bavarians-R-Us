import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import banner from '../bmw-banner.jpeg'
import { findAllDiscussions } from '../../store/discussions'
import { findAllPosts } from '../../store/posts'
import { findAllCategories } from '../../store/category'

import './homepage.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.discussion)

  useEffect(async () => {
    await dispatch(findAllDiscussions())
    await dispatch(findAllPosts())
    await dispatch(findAllCategories())
  }, [dispatch])

  return (
    // <img src={banner} alt="banner" className="banner_image"></img>
    <h1>beans</h1>
  )
}

export default HomePage;
