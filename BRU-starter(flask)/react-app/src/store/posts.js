const ALL_POSTS = 'posts/ALL_POSTS';


const allPosts = (posts) => ({
  type: ALL_POSTS,
  payload: posts
})

export const delExistingPost = (postId) => async (dispatch) => {
  const response = await fetch('/api/posts/', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(postId)
  })
  if (response.ok) {
    const posts = await response.json();
    return dispatch(allPosts(posts));
  } else {
  }
  return null
}

//thunk
export const findAllPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/')
  if (response.ok) {
    const posts = await response.json();
    return dispatch(allPosts(posts));
  } else {
  }
  return null
}


// reducer
// const initialState = {};


export default function postsReducer(state = {}, action) {

  switch (action.type) {
    case ALL_POSTS:
      return action.payload.posts;
    default:
      return state;
  }
}
