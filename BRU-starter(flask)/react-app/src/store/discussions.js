const ALL_DISCUSSIONS = 'discussions/ALL_DISCUSSIONS';


const allDiscussions = (discussions) => ({
  type: ALL_DISCUSSIONS,
  payload: discussions
})

export const delExistingDiscussion = (discussionId) => async (dispatch) => {
  const response = await fetch('/api/discussion/', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(discussionId)
  })
  if (response.ok) {
    const discussions = await response.json();
    return dispatch(allDiscussions(discussions));
  } else {
  }
  return null
}

//thunk
export const findAllDiscussions = () => async (dispatch) => {
  const response = await fetch('/api/discussion/')
  if (response.ok) {
    const discussions = await response.json();
    return dispatch(allDiscussions(discussions));
  } else {
  }
  return null
}

// reducer
// const initialState = {};


export default function discussionsReducer(state = {}, action) {

  switch (action.type) {
    case ALL_DISCUSSIONS:
      return action.payload.discussions;
    default:
      return state;
  }
}
