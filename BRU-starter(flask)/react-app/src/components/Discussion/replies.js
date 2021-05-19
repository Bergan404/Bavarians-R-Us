import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'
import { delExistingDiscussion } from '../../store/discussion_create'
import Moment from "react-moment";
import "moment-timezone";
import defaultImage from '../default_user.jpeg'
import { delExistingReply } from '../../store/reply_create'
import UserReplyForm from '../auth/UserReplyForm'
import UserReplyPage from './user_to_user_reply'
import RepliesPage from '../Replies/index';


const ReplyPage = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const oneDiscussion = useSelector(state => state.oneDiscussion)
    const userId = useSelector(state => state.session.user.id)

    const { postId } = useParams();

    useEffect(async () => {
        await dispatch(findAllCategories())
        await dispatch(findOneDiscussion(postId))
    }, [dispatch])

    return (
        <div>
            {
            oneDiscussion.replies?.length  === 0 ? <p className="cart_empty" >No Replies Yet</p> : oneDiscussion.replies?.map((reply) =>(
                <RepliesPage reply={reply} />
            )).reverse()
          }
        </div>
    )
}

export default ReplyPage;
