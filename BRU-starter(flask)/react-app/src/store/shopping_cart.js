const ALL_CART_ITEMS = 'shopping_cart/ALL_CART_ITEMS';


const allItems = (items) => ({
  type: ALL_CART_ITEMS,
  payload: items
})

export const delExistingCart = (postId) => async (dispatch) => {
  const response = await fetch('/api/cart/', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(postId)
  })
  if (response.ok) {
    const posts = await response.json();
    return dispatch(allItems(posts));
  } else {
  }
  return null
}

//thunk
export const findAllItems = () => async (dispatch) => {
  const response = await fetch('/api/cart/')
  if (response.ok) {
    const items = await response.json();
    return dispatch(allItems(items));
  } else {
  }
  return null
}



export default function cartReducer(state = {}, action) {

  switch (action.type) {
    case ALL_CART_ITEMS:
      return action.payload.post;
    default:
      return state;
  }
}
