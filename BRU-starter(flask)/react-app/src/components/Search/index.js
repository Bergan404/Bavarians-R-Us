import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import defaultImage from '../default_image.png'
import stripes from '../stripes.png'

import './Search.css'


const SearchPage = () => {
  const { searchTerm } = useParams()
  const posts = useSelector(state => state.posts)
  const discussion = useSelector(state => state.discussion)

  const inputs = Object.values(posts);
  let newSearch = []
  if (searchTerm) {
    newSearch = inputs?.filter(post => post.post_title?.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const vals = Object.values(discussion);
  let newerSearch = []
  if (searchTerm) {
    newerSearch = vals?.filter(discussion => discussion.discussion_title?.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return (
    <>
      <h1 className="search_header" >Search Results</h1>
      <div className="search_div" >
        <img src={stripes} alt="stripes" className="search_stripes" />
        <h1 className="search_posts" >Posts</h1>
      </div>
      <div className="homepage_posts_page">
        {
          newSearch?.map((post) => (
            <div className='each_post_page' key={post.id}>
              <NavLink to={`/posts/${post.id}`} className='searchDiv'>
                <img src={post.image ? post.image : defaultImage} alt="post-image" />
                <h3 className="post_title">{post.post_title}</h3>
                <p>{post.description}</p>
              </NavLink>
            </div>
          ))
        }
      </div>
      <div className="search_div" >
        <img src={stripes} alt="stripes" className="search_stripes1" />
        <h1 className="search_discussions" >Discussions</h1>
      </div>
      <div className="homepage_discussions_page">
        {
          newerSearch?.map((discussion) => (
            <div className="each_discussion" key={discussion.id}>
              <NavLink key={discussion.id} to={`/discussion/${discussion.id}`}>
                <h3 className="discussion_title">{discussion.discussion_title}</h3>
                <img src={discussion.image ? discussion.image : defaultImage} alt="discussion-image" />
                <p>{discussion.body}</p>
              </NavLink>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SearchPage;
