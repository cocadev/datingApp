import React, {useState} from 'react';
import {FlatList, TouchableOpacity, Image, Text, View} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import PropTypes from 'prop-types';
import {IMConversationIconView} from '../..';
import AppStyles from '../../../../AppStyles';
import dynamicStyles from './styles';
import { TNEmptyStateView } from '../../../truly-native';
import { IMLocalized } from '../../../localization/IMLocalization';

function IMCreateGroupComponent(props) {
  const {onCancel, isNameDialogVisible, friends, onSubmitName, onCheck, appStyles, onEmptyStatePress} = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  // const [friends, setFriends] = useState([...DATA]);
  // const [nameDialogVisible, setNameDialogVisible] = useState(false);
  // const [input] = useState('');
  const [imgErr, setImgErr] = useState(false);

  // const onCreate = () => {
  //   const checkedFriends = friends.filter(friend => friend.checked);
  //   if (checkedFriends.length === 0) {
  //     alert('Please check one more friends.');
  //   } else {
  //     showNameDialog(true);
  //   }
  // };

  // const onCheck = friend => {
  //   friend.checked = !friend.checked;
  //   const newFriends = friends.map(item => {
  //     if (item.id == friend.id) {
  //       return friend;
  //     }
  //     return item;
  //   });
  //   setFriends(newFriends);
  // };

  // const showNameDialog = show => {
  //   setNameDialogVisible(show);
  // };

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onCheck(item)}
      style={styles.itemContainer}>
      <View style={styles.chatIconContainer}>
        <IMConversationIconView
          style={styles.photo}
          imageStyle={styles.photo}
          participants={[item]}
          appStyles={AppStyles}
        />
        <Text style={styles.name}>{item.firstName}</Text>
      </View>
      <View style={styles.addFlexContainer}>
        {item.checked && (
          <Image style={styles.checked} source={AppStyles.iconSet.checked} />
        )}
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  onImageError = () => {
    setImgErr(true);
    console.log('oops an error occured');
  };

  return (
    <View style={styles.container}>
      { friends && friends.length > 1 && (
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={5}
        />
      )}
      { friends && friends.length <= 1 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              title={IMLocalized("You can't create groups")}
              description={IMLocalized("You don't have enough friends to create groups. Add at least 2 friends to be able to create groups.")}
              appStyles={appStyles}
              buttonName={IMLocalized("Go back")}
              onPress={onEmptyStatePress}
            />
          </View>
        )}
      <DialogInput
        isDialogVisible={isNameDialogVisible}
        title={IMLocalized("Type group name")}
        hintInput="Group Name"
        textInputProps={{selectTextOnFocus: true}}
        submitText="OK"
        submitInput={inputText => {
          onSubmitName(inputText);
        }}
        closeDialog={onCancel}
      />
    </View>
  );
}

IMCreateGroupComponent.propTypes = {
  friends: PropTypes.array,
  onCancel: PropTypes.func,
  isNameDialogVisible: PropTypes.bool,
  friends: PropTypes.func,
  onSubmitName: PropTypes.func,
  onCheck: PropTypes.func,
};

export default IMCreateGroupComponent;
