const ALL_CART_ITEMS = 'shopping_cart/ALL_CART_ITEMS';


const allItems = (posts) => ({
  type: ALL_CART_ITEMS,
  payload: posts
})

//thunk
export const findAllItems = () => async (dispatch) => {
  const response = await fetch('/api/cart/')
  if (response.ok) {
    const items = await response.json();
    return dispatch(allItems(items));
  } else {
      return null
  }
}


// reducer
// const initialState = {};


export default function cartReducer(state = {}, action) {

  switch (action.type) {
    case ALL_CART_ITEMS:
      return action.payload.posts;
    default:
      return state;
  }
}
