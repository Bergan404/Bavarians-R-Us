const ADD_POST = "ADD_POST";

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post,
    }
}


export const addThePost = (id) => async dispatch => {
    const response = await fetch(`/api/cart/${id}`);

    if (response.ok) {
        const post = await response.json();
        dispatch(addPost(post))
    } else {
    }
}


export default function reducer(state = {}, action){
    switch(action.type) {
        case ADD_POST:
            return action.payload
        default:
            return state;
    }
}
