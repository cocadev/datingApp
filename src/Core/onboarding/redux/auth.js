const UPDATE_USER = 'UPDATE_USER';
const LOG_OUT = 'LOG_OUT';
const SET_USERS = 'SET_USERS';

export const DUMMY_USER_DATA = {
  id: '3783873893993783',
  profilePictureURL:
    'https://images.unsplash.com/photo-1495846770511-520ab58b957d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  firstName: 'Mary Gilborne',
};

export const setUsers = data => ({
  type: SET_USERS,
  data,
});

export const setUserData = data => ({
  type: UPDATE_USER,
  data,
});

export const logout = () => ({
  type: LOG_OUT,
});

const initialState = {
  user: DUMMY_USER_DATA,
  users: []
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.user,
      };
    case SET_USERS:
      return { ...state, users: [...action.data] };
    case LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};
