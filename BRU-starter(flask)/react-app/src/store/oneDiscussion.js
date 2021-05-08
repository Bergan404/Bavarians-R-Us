const ONE_DISCUSSION = 'oneDiscussion/ONE_DISCUSSION'

const oneDiscussion = (discussion) => ({
    type: ONE_DISCUSSION,
    payload: discussion
  })

export const findOneDiscussion = (id) => async (dispatch) => {
const response = await fetch(`/api/discussion/${id}`)
if (response.ok) {
    const discussion = await response.json();
    return dispatch(oneDiscussion(discussion));
} else {
}
return null
}

export default function discussionsReducer(state = {}, action) {

    switch (action.type) {
      case ONE_DISCUSSION:
        return action.payload;
      default:
        return state;
    }
  }
