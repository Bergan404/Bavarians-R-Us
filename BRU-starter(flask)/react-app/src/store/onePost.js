const ONE_POST = 'onePost/ONE_POST'

const onePost = (post) => ({
    type: ONE_POST,
    payload: post
  })

export const findOnePost = (postId) => async (dispatch) => {
const response = await fetch(`/api/posts/${postId}`)
if (response.ok) {
    const post = await response.json();
    return dispatch(onePost(post));
} else {
}
return null
}

export default function postsReducer(state = {}, action) {

    switch (action.type) {
      case ONE_POST:
        return action.payload;
      default:
        return state;
    }
  }
