const ALL_REVIEWS = 'reviews/ALL_REVIEWS';


const allReviews = (reviews) => ({
  type: ALL_REVIEWS,
  payload: reviews
})

//thunk
export const findAllReviews = () => async (dispatch) => {
  const response = await fetch('/api/reviews/')
  if (response.ok) {
    const reviews = await response.json();
    return dispatch(allReviews(reviews));
  } else {
  }
  return null
}


// reducer
// const initialState = {};


export default function reviewsReducer(state = {}, action) {

  switch (action.type) {
    case ALL_REVIEWS
:
      return action.payload.reviews;
    default:
      return state;
  }
}
