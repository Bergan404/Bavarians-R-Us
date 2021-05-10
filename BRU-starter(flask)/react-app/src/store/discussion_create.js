const CREATE_DISCUSSION = 'discussion_create/CREATE_DISCUSSION';
const DELETE_DISCUSSION = 'discussion_delete/DELETE_DISCUSSION';

const createDiscussion = (discussion) => ({
    type: CREATE_DISCUSSION,
    payload: discussion
})

const deleteDiscussion = () => ({
    type: DELETE_DISCUSSION
})


export const delExistingDiscussion = (discussionId) => async (dispatch) => {
    await fetch('/api/discussion/', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(discussionId)
    })
    dispatch(deleteDiscussion())
}



export const discussionCreate = (discussion_title, body, image, userId, created_at) => async (dispatch) => {
    const formData = new FormData();
    formData.append('discussion_title', discussion_title);
    formData.append('body', body);
    if (image) {
        formData.append('image', image);
    }
    formData.append('userId', userId);
    formData.append('created_at', created_at);

    const response = await fetch("/api/discussion/create", {
        // method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //     discussion_title,
        //     body,
        //     image,
        //     userId,
        //     created_at
        // }),
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: formData
    });
    const data = await response.json();
    dispatch(createDiscussion(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_DISCUSSION:
            return action.payload;
        case DELETE_DISCUSSION:
            state = {}
            return state
        default:
            return state;

    }
}
