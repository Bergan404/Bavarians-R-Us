const ALL_USERS = 'all_users/ALL_USERS';


const allUsers = (users) => ({
  type: ALL_USERS,
  payload: users
})

//thunk
export const findAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/')
  if (response.ok) {
    const users = await response.json();
    return dispatch(allUsers(users));
  } else {
  }
  return null
}


// reducer
// const initialState = {};


export default function usersReducer(state = {}, action) {

  switch (action.type) {
    case ALL_USERS:
      return action.payload.users;
    default:
      return state;
  }
}
