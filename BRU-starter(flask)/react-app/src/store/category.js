const ALL_CATEGORIES = 'category/ALL_CATEGORIES';


const allCategories = (categories) => ({
  type: ALL_CATEGORIES,
  payload: categories
})

//thunk
export const findAllCategories = () => async (dispatch) => {
  const response = await fetch('/api/categories/')
  if (response.ok) {
    const categories = await response.json();
    return dispatch(allCategories(categories));
  } else {
  }
  return null
}

// reducer
// const initialState = {};


export default function categoriesReducer(state = {}, action) {

  switch (action.type) {
    case ALL_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
