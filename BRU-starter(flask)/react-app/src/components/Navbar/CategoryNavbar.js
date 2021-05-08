import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './navbar.css'

const CategoryNavbar = () => {
  const user = useSelector(state => state.session.user)
  const categories = useSelector(state => state.categories.categories)

  console.log(categories)

  return (
    <nav className="nav_container">
        <div>
            {
              categories?.length && categories.map((category) => (
                <NavLink key={category.id} to={`/${category.id}`}>
                    {category.category}
                </NavLink>
              ))
            }
        </div>
    </nav>
  );
}

export default CategoryNavbar;