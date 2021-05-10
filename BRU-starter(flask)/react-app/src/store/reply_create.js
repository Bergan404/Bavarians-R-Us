const CREATE_REPLY = 'reply_create/CREATE_REPLY';

const createReply = (reply) => ({
    type: CREATE_REPLY,
    payload: reply
})

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
        default:
            return state;

    }
}
