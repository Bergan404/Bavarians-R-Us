import React from "react";
import { NavLink } from 'react-router-dom'


const CartProperties = (cart) => {

    return (
        <>
            <div className="cart-posts" >
                <NavLink to={`/post/${cart.props.id}`}>
                    <img className="homepage-picture" src={cart.props.listPicture} alt="shoppingCart" />
                    <div>{cart.props.postTitle}</div>
                    <div>{cart.props.price}</div>
                </NavLink>
            </div>
        </>
    )
}

export default CartProperties;
