import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { channelManager } from '../firebase';
import {
  setChannels,
  setChannelParticipations,
  setChannelsSubcribed
} from '../redux';
import { setBannedUserIDs } from '../../user-reporting/redux';
import IMConversationList from '../IMConversationList';
import { reportingManager } from '../../user-reporting';

class IMConversationListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      appStyles: (
        (props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.appStyles)
        || props.navigation.getParam('appStyles')
        || props.appStyles)
    };
  }

  componentDidMount() {
    const self = this;
    const userId = self.props.user.id || self.props.user.userID;
    if (!self.props.areChannelsSubcribed) {
      self.unsubscribeAbuseDB = reportingManager.unsubscribeAbuseDB(userId, this.onAbuseDBUpdate);
      self.props.setChannelsSubcribed(true);
    } else {
      self.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    if (this.channelPaticipationUnsubscribe) {
      this.channelPaticipationUnsubscribe();
    }
    if (this.channelsUnsubscribe) {
      this.channelsUnsubscribe();
    }
    if (this.unsubscribeAbuseDB) {
      this.unsubscribeAbuseDB();
    }
  }

  onChannelParticipationCollectionUpdate = (data, channelsRef) => {
    const channels = this.props.channels.filter(channel => {
      return (
        data.filter(participation => channel.id == participation.channel)
          .length > 0
      );
    });

    this.props.setChannels(this.channelsWithNoBannedUsers(channels, this.props.bannedUserIDs));
    this.props.setChannelParticipations(data);
  };

  onChannelCollectionUpdate = querySnapshot => {
    const self = this;
    const { data, channelPromiseArray } = channelManager.filterQuerySnapshot(
      self,
      querySnapshot,
      channelManager,
    );

    Promise.all(channelPromiseArray).then(values => {
      const sortedData = data.sort(function (a, b) {
        if (!a.lastMessageDate) {
          return 1;
        }
        if (!b.lastMessageDate) {
          return -1;
        }
        a = new Date(a.lastMessageDate.seconds);
        b = new Date(b.lastMessageDate.seconds);
        return a > b ? -1 : a < b ? 1 : 0;
      });

      self.props.setChannels(self.channelsWithNoBannedUsers(sortedData, self.props.bannedUserIDs));
      self.setState({ loading: false });
    });
  };

  onAbuseDBUpdate = (abuses) => {
    var bannedUserIDs = [];
    abuses.forEach(abuse => bannedUserIDs.push(abuse.dest));
    this.props.setBannedUserIDs(bannedUserIDs);
    this.props.setChannels(this.channelsWithNoBannedUsers(this.props.channels, bannedUserIDs));

    const userId = this.props.user.id || this.props.user.userID;
    this.channelParticipantUnsubscribe = channelManager.subscribeChannelParticipation(
      userId,
      this.onChannelParticipationCollectionUpdate,
    );
    this.channelsUnsubscribe = channelManager.subscribeChannels(
      this.onChannelCollectionUpdate,
    );
  }

  onConversationPress = channel => {
    this.props.navigation.navigate('PersonalChat', { channel, appStyles: this.state.appStyles });
  };

  channelsWithNoBannedUsers = (channels, bannedUserIDs) => {
    const channelsWithNoBannedUsers = [];
    channels.forEach(channel => {
      if (!channel.participants
        || channel.participants.length != 1
        || !bannedUserIDs.includes(channel.participants[0].id)) {
        channelsWithNoBannedUsers.push(channel);
      }
    });
    return channelsWithNoBannedUsers;
  }

  render() {
    return (
      <IMConversationList
        loading={this.state.loading}
        conversations={this.props.channels}
        onConversationPress={this.onConversationPress}
        appStyles={this.state.appStyles}
        emptyStateConfig={this.props.emptyStateConfig}
      />
    );
  }
}

IMConversationListView.propTypes = {
  acceptedFriendships: PropTypes.array,
  channels: PropTypes.array,
};

const mapStateToProps = ({ chat, auth, userReports }) => {
  return {
    channels: chat.channels,
    channelParticipations: chat.channelParticipations,
    areChannelsSubcribed: chat.areChannelsSubcribed,
    user: auth.user,
    bannedUserIDs: userReports.bannedUserIDs,
  };
};

export default connect(mapStateToProps, {
  setChannels,
  setChannelParticipations,
  setChannelsSubcribed,
  setBannedUserIDs
})(IMConversationListView);
