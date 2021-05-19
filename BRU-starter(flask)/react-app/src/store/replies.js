const ALL_REPLIES = 'replies/ALL_REPLIES';


const allReplies = (replies) => ({
  type: ALL_REPLIES,
  payload: replies
})

export const delExistingReply = (replyId) => async (dispatch) => {
  const response = await fetch('/api/replies/', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(replyId)
  })
  if (response.ok) {
    const reply = await response.json();
    return dispatch(allReplies(reply));
  } else {
  }
  return null
}

//thunk
export const findAllReplies = () => async (dispatch) => {
  const response = await fetch('/api/replies/')
  if (response.ok) {
    const reply = await response.json();
    return dispatch(allReplies(reply));
  } else {
  }
  return null
}


export default function repliesReducer(state = {}, action) {

  switch (action.type) {
    case ALL_REPLIES:
      return action.payload.reply;
    default:
      return state;
  }
}
