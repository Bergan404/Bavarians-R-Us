const CREATE_USER_REPLY = 'user_to_user_reply/CREATE_USER_REPLY';
// const DELETE_REPLY = 'reply_create/DELETE_REPLY';

const createReply = (reply) => ({
    type: CREATE_USER_REPLY,
    payload: reply
})

// const deleteReply = () => ({
//     type: DELETE_REPLY
// })

// export const delExistingReply = (replyId) => async (dispatch) => {
//     await fetch('/api/replies/', {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(replyId)
//     })
//     dispatch(deleteReply())
// }

export const userReplyCreate = (body, replyId, created_at) => async (dispatch) => {
    const response = await fetch("/api/userreplies/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body,
            replyId
        }),
    });
    const data = await response.json();
    dispatch(createReply(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_USER_REPLY:
            return action.payload;
        // case DELETE_REPLY:
        //     state = {}
        //     return state
        default:
            return state;

    }
}
