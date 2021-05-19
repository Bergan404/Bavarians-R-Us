const CREATE_REPLY = 'reply_create/CREATE_REPLY';
const DELETE_REPLY = 'reply_create/DELETE_REPLY';

const createReply = (reply) => ({
    type: CREATE_REPLY,
    payload: reply
})

const deleteReply = (id) => ({
    type: DELETE_REPLY,
    payload: id
})

export const delExistingReply = (replyId) => async (dispatch) => {
    await fetch('/api/replies/', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(replyId)
    })
    dispatch(deleteReply(replyId))
}

export const replyCreate = (body, discussionId, created_at) => async (dispatch) => {
    const response = await fetch("/api/replies/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body,
            discussionId,
            created_at
        }),
    });
    const data = await response.json();
    dispatch(createReply(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_REPLY:
            return action.payload;
        case DELETE_REPLY:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state;

    }
}
