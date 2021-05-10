const ONE_CATEGORY = 'oneCategory/ONE_CATEGORY'

const oneCategory = (category) => ({
    type: ONE_CATEGORY,
    payload: category
  })

export const findOneCategory = (id) => async (dispatch) => {
const response = await fetch(`/api/categories/${id}`)
if (response.ok) {
    const post = await response.json();
    return dispatch(oneCategory(post));
} else {
}
return null
}

export default function categoriesReducer(state = {}, action) {

    switch (action.type) {
      case ONE_CATEGORY:
        return action.payload;
      default:
        return state;
    }
  }
