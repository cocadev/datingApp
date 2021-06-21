// import PropTypes from 'prop-types';
// import React, {Component} from 'react';
// import {Platform} from 'react-native';
// import {connect} from 'react-redux';
// import {Chat} from '../../components';
// import {TNTouchableIcon} from '../../Core/truly-native';
// import {firebaseFriendship} from '../../firebase';
// import {
//   setAcceptedFriendshipsWithPendings,
//   setPendingFriendShipSubscribed,
//   setPendingFriendships,
//   setUsers,
// } from '../../redux';
// import {
//   filterUsers,
//   filterForFriends,
//   filterPendingFriendShips,
// } from '../../utils/friendshipFilter';
// import AppStyles from '../../AppStyles';
// import { IMLocalized } from '../../Core/localization/IMLocalization';

// class IMFriendTrayView extends Component {
//   static navigationOptions = ({screenProps, navigation}) => {
//     let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
//     const {params = {}} = navigation.state;
//     return {
//       headerTitle: 'Chat',
//       headerRight: (
//         <TNTouchableIcon
//           imageStyle={{tintColor: currentTheme.fontColor}}
//           iconSource={AppStyles.iconSet.inscription}
//           onPress={() => navigation.navigate('CreateGroup')}
//           appStyles={AppStyles}
//         />
//       ),
//       headerLeft: Platform.OS === 'android' && (
//         <TNTouchableIcon
//           imageStyle={{tintColor: currentTheme.fontColor}}
//           iconSource={AppStyles.iconSet.menuHamburger}
//           onPress={params.openDrawer}
//           appStyles={AppStyles}
//         />
//       ),
//       headerStyle: {
//         backgroundColor: currentTheme.backgroundColor,
//         borderBottomColor: currentTheme.hairlineColor,
//       },
//       headerTintColor: currentTheme.fontColor,
//     };
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       isSearchModalOpen: false,
//       filteredUsers: [],
//       loading: true,
//     };
//     this.searchBarRef = React.createRef();
//   }

//   componentDidMount() {
//     const self = this;
//     const userId = self.props.user.id;

//     self.props.navigation.setParams({
//       toggleCamera: self.toggleCamera,
//       openDrawer: self.openDrawer,
//     });

//     if (!self.props.arePendingFriendshipSubscribed) {
//       self.toMePendingFriendshipssUnsubscribe = firebaseFriendship.subscribeToMePendingFriendships(
//         userId,
//         self.onPendingFriendShipsCollectionUpdate,
//       );
//       self.toHimPendingFriendshipssUnsubscribe = firebaseFriendship.subscribeToHimPendingFriendships(
//         userId,
//         self.onPendingFriendShipsCollectionUpdate,
//       );
//     }
//   }

//   componentWillUnmount() {
//     if (this.toMePendingFriendshipssUnsubscribe)
//       this.toMePendingFriendshipssUnsubscribe();
//     if (this.toHimPendingFriendshipssUnsubscribe)
//       this.toHimPendingFriendshipssUnsubscribe();
//   }

//   onPendingFriendShipsCollectionUpdate = (data, usersRef) => {
//     const newUsers = filterPendingFriendShips(
//       this.props.users,
//       data,
//       this.props.user.id,
//     );

//     this.props.setUsers(newUsers);
//     this.props.setPendingFriendships([
//       ...this.props.pendingFriendships,
//       ...data,
//     ]);

//     this.friendsUnsubscribe = usersRef.onSnapshot(this.onUsersCollectionUpdate);
//   };

//   onUsersCollectionUpdate = querySnapshot => {
//     let friendsWithPendings = [];
//     querySnapshot.forEach(doc => {
//       const user = doc.data();
//       user.id = doc.id;

//       friendsWithPendings = filterForFriends(
//         this.props.user.id,
//         friendsWithPendings,
//         user,
//         this.props.heAcceptedFriendships,
//         this.props.iAcceptedFriendships,
//         this.props.pendingFriendships,
//       );
//     });
//     this.props.setAcceptedFriendshipsWithPendings(friendsWithPendings);
//     this.props.setPendingFriendShipSubscribed(true);
//   };

//   onSearchTextChange = text => {
//     this.setState({keyword: text});
//     const filteredUsers = filterUsers(text, this.props.users);
//     this.setState({filteredUsers});
//   };

//   openDrawer = () => {
//     this.props.navigation.openDrawer();
//   };

//   onFriendItemPress = friend => {
//     this.setState({isSearchModalOpen: false});
//     const id1 = this.props.user.id || this.props.user.userID;
//     const id2 = friend.id || friend.userID;
//     const channel = {
//       id: id1 < id2 ? id1 + id2 : id2 + id1,
//       participants: [friend]
//     }
//     this.props.navigation.navigate('PersonalChat', {channel, appStyles: AppStyles});
//   };

//   onFriendAction = (item, index) => {
//     const friendshipType = AppStyles.friendActions[item.type];
//     if (friendshipType == AppStyles.actionObj.ADD) {
//       this.onAdd(item, index);
//     }
//   };

//   onAdd = (item, index) => {
//     const data = {
//       user1: this.props.user.id,
//       user2: item.id,
//       // created_at: new Date(),
//     };
//     firebaseFriendship.addFriend(data, ({success, error}) => {
//       if (error) {
//         alert(error);
//       }
//       if (success) {
//         alert(IMLocalized('Successfully sent request.'));
//         this.removeAddedFriend(index);
//       }
//     });
//   };

//   removeAddedFriend = async index => {
//     const newFilteredUsers = [...this.state.filteredUsers];
//     await newFilteredUsers.splice(index, 1);
//     this.setState({
//       filteredUsers: [...newFilteredUsers],
//     });
//   };

//   onSearchBar = async () => {
//     this.setState(prevState => ({
//       isSearchModalOpen: !prevState.isSearchModalOpen,
//     }));

//     setTimeout(() => {
//       if (this.searchBarRef.current) {
//         this.searchBarRef.current.focus();
//       }
//     }, 500);
//   };

//   onSearchModalClose = () => {
//     this.setState({
//       isSearchModalOpen: false,
//     });
//   };

//   onSearchClear = () => {
//     this.setState({keyword: ''});
//     const filteredUsers = filterUsers('', this.props.users);
//     this.setState({filteredUsers});
//   };

//   render() {
//     return (
//       <Chat
//         loading={this.state.loading}
//         searchBarRef={this.searchBarRef}
//         friends={this.props.acceptedFriendships}
//         onFriendItemPress={this.onFriendItemPress}
//         onSearchBarPress={this.onSearchBar}
//         searchData={this.state.filteredUsers}
//         onSearchTextChange={this.onSearchTextChange}
//         isSearchModalOpen={this.state.isSearchModalOpen}
//         onSearchModalClose={this.onSearchModalClose}
//         onSearchBarCancel={this.onSearchBar}
//         onSearchClear={this.onSearchClear}
//         onFriendAction={this.onFriendAction}
//         appStyles={AppStyles}
//         navigation={this.props.navigation}
//       />
//     );
//   }
// }

// IMFriendTrayView.propTypes = {
//   acceptedFriendships: PropTypes.array,
//   users: PropTypes.array,
// };

// const mapStateToProps = ({friends, chat, auth}) => {
//   return {
//     acceptedFriendships: friends.acceptedFriendships,
//     user: auth.user,
//     heAcceptedFriendships: friends.heAcceptedFriendships,
//     iAcceptedFriendships: friends.iAcceptedFriendships,
//     pendingFriendships: friends.pendingFriendships,
//     arePendingFriendshipSubscribed: friends.arePendingFriendshipSubscribed,
//   };
// };

// export default connect(mapStateToProps, {
//   setAcceptedFriendshipsWithPendings,
//   setPendingFriendShipSubscribed,
//   setPendingFriendships,
// })(IMFriendTrayView);
