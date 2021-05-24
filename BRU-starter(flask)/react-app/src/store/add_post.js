const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST"

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post,
    }
}

const deleteCartPost = (post) => ({
    type: DELETE_POST,
    payload: post
})

export const delExistingCart = (postId) => async (dispatch) => {
    await fetch('/api/cart/', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postId)
    })
    dispatch(deleteCartPost(postId))
}


export const addThePost = (id) => async dispatch => {
    const response = await fetch(`/api/cart/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId: id
        }),
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(addPost(post))
    }
}


export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_POST:
            return [...state, action.payload]
        case DELETE_POST:
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}
