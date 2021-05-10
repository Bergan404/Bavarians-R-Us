const CREATE_REVIEW = 'review_create/CREATE_REVIEW';

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const reviewCreate = (body, postId, created_at) => async (dispatch) => {
    const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body,
            postId,
            created_at
        }),
    });
    const data = await response.json();
    dispatch(createReview(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_REVIEW:
            return action.payload;
        default:
            return state;

    }
}
