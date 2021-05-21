import React from 'react';
import { useSelector } from 'react-redux'
import RepliesPage from '../Replies/index';


const ReplyPage = (props) => {
    const oneDiscussion = useSelector(state => state.oneDiscussion)

    return (
        <div>
            {
            oneDiscussion.replies?.length  === 0 ? <p className="cart_empty" >No Replies Yet</p> : oneDiscussion.replies?.map((reply) =>(
                <RepliesPage reply={reply} key={reply.id} />
            )).reverse()
          }
        </div>
    )
}

export default ReplyPage;
