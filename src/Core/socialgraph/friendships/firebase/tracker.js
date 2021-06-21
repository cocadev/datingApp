import {
  setFriendsListenerDidSubscribe,
  setFriends,
  setFriendships
} from '../redux';
import { setUsers } from '../../../onboarding/redux/auth';
import { setBannedUserIDs } from '../../../user-reporting/redux';
import * as firebaseFriendship from './friendship';
import { firebaseUser } from './../../../firebase';
import { FriendshipConstants } from '../constants';
import { reportingManager } from '../../../user-reporting';

export default class FriendshipTracker {

  constructor(reduxStore, userID) {
    this.reduxStore = reduxStore;
    this.userID = userID;
    this.state = reduxStore.getState();
    this.reduxStore.subscribe(this.syncTrackerToStore)
  }

  syncTrackerToStore = () => {
    this.state = this.reduxStore.getState();
    this.users = this.state.auth.users;
  }

  subscribeIfNeeded = () => {
    const userId = this.userID;
    if (!this.state.friends.didSubscribeToFriendships) {
      this.reduxStore.dispatch(setFriendsListenerDidSubscribe());
      this.usersUnsubscribe = firebaseUser.subscribeUsers(
        userId,
        this.onUsersCollection,
      );
      this.abusesUnsubscribe = reportingManager.unsubscribeAbuseDB(
        userId,
        this.onAbusesUpdate
      );
      this.inboundFriendshipsUnsubscribe = firebaseFriendship.subscribeToInboundFriendships(
        userId,
        this.onInboundFriendshipsUpdate,
      );
      this.outboundFriendshipsUnsubscribe = firebaseFriendship.subscribeToOutboundFriendships(
        userId,
        this.onOutboundFriendshipsUpdate,
      );
    }
  };

  unsubscribe = () => {
    if (this.usersUnsubscribe) {
      this.usersUnsubscribe();
    }
    if (this.inboundFriendshipsUnsubscribe) {
      this.inboundFriendshipsUnsubscribe();
    }
    if (this.outboundFriendshipsUnsubscribe) {
      this.outboundFriendshipsUnsubscribe();
    }
    if (this.abusesUnsubscribe) {
      this.abusesUnsubscribe();
    }
  };

  addFriendRequest = (fromUser, toUser, callback) => {
    const friendships = this.state.friends.friendships;
    const detectedFriendship = friendships.find(friendship => friendship.user.id == toUser.id);
    if (detectedFriendship && detectedFriendship.type != FriendshipConstants.FriendshipType.inbound) {
      // invalid state - current user already requested a friendship from toUser
      return;
    }

    firebaseFriendship.addFriendRequest(fromUser.id, toUser.id, response => {
      callback(response);
    })
  }

  unfriend = (fromUser, toUser, callback) => {
    firebaseFriendship.unfriend(
      fromUser.id || fromUser.userID,
      toUser.id || fromUser.userID,
      callback
    );
  }

  cancelFriendRequest = (fromUser, toUser, callback) => {
    firebaseFriendship.cancelFriendRequest(
      fromUser.id || fromUser.userID,
      toUser.id || fromUser.userID,
      callback
    );
  }

  updateUsers = (users) => {
    // We remove all friends and friendships from banned users
    const state = this.reduxStore.getState();
    const bannedUserIDs = state.userReports.bannedUserIDs;

    if (bannedUserIDs) {
      this.users = users.filter(user => !bannedUserIDs.includes(user.id));
    } else {
      this.users = users;
    }
    this.reduxStore.dispatch(setUsers(this.users));
    this.hydrateFriendships();
  }

  onUsersCollection = (data, completeData) => {
    this.updateUsers(data);
  };

  onAbusesUpdate = (abuses) => {
    var bannedUserIDs = [];
    abuses.forEach(abuse => bannedUserIDs.push(abuse.dest));
    this.reduxStore.dispatch(setBannedUserIDs(bannedUserIDs));
    this.bannedUserIDs = bannedUserIDs;
    this.purgeBannedUsers();
    this.hydrateFriendships();
  }

  onInboundFriendshipsUpdate = (inboundFriendships) => {
    this.inboundFriendships = inboundFriendships;
    this.hydrateFriendships();
  }

  onOutboundFriendshipsUpdate = (outboundFriendships) => {
    this.outboundFriendships = outboundFriendships;
    this.hydrateFriendships();
  }

  hydrateFriendships() {
    const inboundFriendships = this.inboundFriendships;
    const outboundFriendships = this.outboundFriendships;
    const hydratedUsers = this.users;
    const bannedUserIDs = this.bannedUserIDs;
    if (hydratedUsers
      && hydratedUsers.length > 0
      && inboundFriendships
      && outboundFriendships
      && bannedUserIDs
    ) {
      // we received all the data we need - users, inbound requests, outbound requests, and user reports
      const outboundFriendsIDs = {};
      outboundFriendships.forEach(friendship => {
        outboundFriendsIDs[friendship.user2] = true;
      })
      const inboundFriendsIDs = {};
      inboundFriendships.forEach(friendship => {
        inboundFriendsIDs[friendship.user1] = true;
      })
      const reciprocalfriendships = inboundFriendships.filter(inboundFriendship => (outboundFriendsIDs[inboundFriendship.user1] == true)); // reciprocal
      const friendsIDs = reciprocalfriendships.map(inboundFriendship => inboundFriendship.user1);
      const friendsIDsHash = {};
      friendsIDs.forEach(friendID => {
        friendsIDsHash[friendID] = true;
      })

      const usersHash = {};
      hydratedUsers.forEach(user => {
        usersHash[user.id] = user;
      })

      const hydratedFriends = hydratedUsers.filter(user => outboundFriendsIDs[user.id] == true && inboundFriendsIDs[user.id] == true);
      const friendshipsFromFriends = hydratedFriends.map(friend => {
        return {
          user: friend,
          type: 'reciprocal'
        }
      });

      const friendshipsFromInbound = inboundFriendships.filter(friendship => (friendsIDsHash[friendship.user1] != true && usersHash[friendship.user1])).map(friendship => {
        return {
          user: usersHash[friendship.user1],
          type: 'inbound'
        }
      })

      const friendshipsFromOutbound = outboundFriendships.filter(friendship => (friendsIDsHash[friendship.user2] != true && usersHash[friendship.user2])).map(friendship => {
        return {
          user: usersHash[friendship.user2],
          type: 'outbound'
        }
      })
      // We remove all friends and friendships from banned users
      const state = this.reduxStore.getState();
      const bannedUserIDs = state.userReports.bannedUserIDs;

      const finalFriendships = [...friendshipsFromInbound, ...friendshipsFromFriends, ...friendshipsFromOutbound].filter(friendship => !bannedUserIDs.includes(friendship.user.id));
      this.reduxStore.dispatch(setFriendships(finalFriendships));

      const finalFriends = hydratedFriends.filter(friend => !bannedUserIDs.includes(friend.id));
      this.reduxStore.dispatch(setFriends(finalFriends));
    }
  }

  purgeBannedUsers() {
    const state = this.reduxStore.getState();
    const bannedUserIDs = this.bannedUserIDs;
    const users = state.auth.users.filter(user => !bannedUserIDs.includes(user.id));
    this.reduxStore.dispatch(setUsers(users));
  }
}