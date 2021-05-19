import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import Moment from "react-moment";
import "moment-timezone";
import defaultImage from '../default_user.jpeg'


const UserReplyPage = (props) => {
    const oneDiscussion = useSelector(state => state.oneDiscussion)
    const userId = useSelector(state => state.session.user.id)

    return (
        <div>
            {
            oneDiscussion.replies?.length  === 0 ? <p className="cart_empty" >No Replies Yet</p> : oneDiscussion.replies?.map((reply) =>(
                <div className="replies" >
                    
                </div>
            )).reverse()
          }
        </div>
    )
}

export default UserReplyPage;
