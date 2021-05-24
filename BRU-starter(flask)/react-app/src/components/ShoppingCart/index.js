import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory } from 'react-router-dom';
import { delExistingCart } from '../../store/add_post'
import { findAllItems } from '../../store/shopping_cart'
import defaultImage from '../default_image.png'


import './shoppingcart.css'

const ShoppingCart = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const addThePost = useSelector(state => state.addThePost)

    let total = 0;
    if (addThePost) {
        const itemTotal = addThePost.forEach(item => {
            let itemPrice = item.price.slice(1);
            total = total + +itemPrice
            return total
        })
    }

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findAllItems())
    }, [dispatch])

    const checkOut = async (e) => {
        e.preventDefault();

        history.push(`/checkout/${user.id}`)
    }

    const handleCartDelete = async (e, id) => {
		e.preventDefault();
		dispatch(delExistingCart(id));
        window.location.reload()
	};

    return (
        <>
            <h1 className="cart_header" >Shopping Cart</h1>
            <div className="cart_posts" >
                {
                    addThePost?.length === 0 ? <p className="cart_empty" >Cart Is Empty</p> : addThePost.map((post) => (
                        <div className="each_post" key={post.id}>
                            <button className="delete-button" onClick={(e) => handleCartDelete(e, post.id)} >Delete</button>
                            <NavLink key={post.id} to={`/posts/${post.id}`}>
                                <img src={post.image ? post.image : defaultImage} alt="post-image" />
                                <h3 className="post_title">{post.post_title}</h3>
                                <p>{post.description}</p>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
            <h3 className="total">Total: ${total}</h3>
            <div className="checkout_button_div">
                <button type="submit" className="checkout_button" onClick={checkOut}>Checkout</button>
            </div>
        </>
    )
}


export default ShoppingCart;
