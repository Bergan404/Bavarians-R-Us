const ADD_POST = "ADD_POST";

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post,
    }
}


export const addThePost = (id) => async dispatch => {
    const response = await fetch(`/api/cart/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId:id
        }),
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(addPost(post))
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
