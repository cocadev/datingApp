import IMFriendshipActionsConstants from './types';

export const setFriendships = data => ({
    type: IMFriendshipActionsConstants.SET_FRIENDSHIPS,
    data,
});

export const setFriends = data => ({
    type: IMFriendshipActionsConstants.SET_FRIENDS,
    data,
});

export const setFriendsListenerDidSubscribe = () => ({
    type: IMFriendshipActionsConstants.DID_SUBSCRIBE
});
