import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findAllCategories } from '../../store/category'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { findOneDiscussion } from '../../store/oneDiscussion'
import { delExistingDiscussion } from '../../store/discussion_create'


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
            oneDiscussion.replies?.length && oneDiscussion.replies.map((reply) =>(
                <div className="replies" >
                    <p>{reply.body}</p>
                </div>
            ))
          }
        </div>
    )
}

export default ReplyPage;
