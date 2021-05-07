const CREATE_DISCUSSION = 'discussion_create/CREATE_DISCUSSION';
// const DELETE_SERVER = 'server_delete/DELETE_SERVER';

const createDiscussion = (discussion) => ({
    type: CREATE_DISCUSSION,
    payload: discussion
})

// const deleteServer = () => ({
//     type: DELETE_SERVER
// })


// export const delExistingServer = (serverId) => async (dispatch) => {
//     await fetch('/api/server/', {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(serverId)
//     })
//     dispatch(deleteServer())
// }



export const discussionCreate = (discussion_title, body, image, userId, created_at) => async (dispatch) => {
    const response = await fetch("/api/discussion/create", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
            discussion_title,
            body,
            image,
            userId,
            created_at
        }),
    });
    const data = await response.json();
    dispatch(createDiscussion(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_DISCUSSION:
            return action.payload;
        // case DELETE_SERVER:
        //     state = {}
        //     return state
        default:
            return state;

    }
}
