import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import defaultImage from '../default_image.png'


const SearchPage = () => {
  const { searchTerm } = useParams()
  const posts = useSelector(state => state.posts)
  const [search, setSearch] = useState('');

  const inputs = Object.values(posts);
  let newSearch = []
  if (search) {
    newSearch = inputs?.filter(post => post.searchTerm?.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return (
    <>
      <h1>Search Results:</h1>
      {
        newSearch?.map((post) => (
          <div className='outerDiv'>
            <NavLink to={`/posts/${post.id}`} className='searchDiv'>
              <img src={post.image ? post.image : defaultImage} alt="post-image" />
              <h3 className="post_title">{post.post_title}</h3>
              <p>{post.description}</p>
            </NavLink>
          </div>
        ))
      }
    </>
  )
}

export default SearchPage;
