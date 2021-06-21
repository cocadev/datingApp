import IMFriendshipActionsConstants from './types';

const initialState = {
  friends: [],
  friendships: [],
  didSubscribeToFriendships: false,
};

export const friends = (state = initialState, action) => {
  switch (action.type) {
    case IMFriendshipActionsConstants.SET_FRIENDS:
      return { ...state, friends: [...action.data] };
    case IMFriendshipActionsConstants.SET_FRIENDSHIPS:
      return { ...state, friendships: [...action.data] };
    case IMFriendshipActionsConstants.DID_SUBSCRIBE:
      return { ...state, didSubscribeToFriendships: true };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
