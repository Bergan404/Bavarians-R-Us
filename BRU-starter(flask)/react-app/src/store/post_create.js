const CREATE_POST = 'post_create/CREATE_POST';
// const DELETE_SERVER = 'server_delete/DELETE_SERVER';

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
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



export const postCreate = (post_title, image, description, year, model, price, in_stock, new_used, userId, categoryId) => async (dispatch) => {
    const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
            post_title,
            image,
            description,
            year,
            model,
            price,
            in_stock,
            new_used,
            userId,
            categoryId
        }),
    });
    const data = await response.json();
    dispatch(createPost(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_POST:
            return action.payload;
        // case DELETE_SERVER:
        //     state = {}
        //     return state
        default:
            return state;

    }
}
