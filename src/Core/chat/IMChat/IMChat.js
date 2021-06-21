import React, { useState, useRef } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import TNMediaViewerModal from '../../truly-native/TNMediaViewerModal';
import DialogInput from 'react-native-dialog-input';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import BottomInput from './BottomInput';
import MessageThread from './MessageThread';
import dynamicStyles from './styles';
import { IMLocalized } from '../../localization/IMLocalization';

function IMChat(props) {
  const {
    onSendInput,
    thread,
    inputValue,
    onChangeTextInput,
    user,
    onLaunchCamera,
    onOpenPhotos,
    onAddMediaPress,
    uploadProgress,
    sortMediafromThread,
    isMediaViewerOpen,
    selectedMediaIndex,
    onChatMediaPress,
    onMediaClose,
    onChangeName,
    isRenameDialogVisible,
    groupSettingsActionSheetRef,
    privateSettingsActionSheetRef,
    showRenameDialog,
    onLeave,
    appStyles,
    onUserBlockPress,
    onUserReportPress,
    onSenderProfilePicturePress
  } = props;

  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const [channel] = useState({});

  const photoUploadDialogRef = useRef();

  const onChangeText = text => {
    onChangeTextInput(text);
  };

  const onSend = () => {
    onSendInput();
  };

  const onPhotoUploadDialogDone = index => {
    if (index == 0) {
      onLaunchCamera();
    }

    if (index == 1) {
      onOpenPhotos();
    }
  };

  const onGroupSettingsActionDone = index => {
    if (index == 0) {
      showRenameDialog(true);
    } else if (index == 1) {
      onLeave();
    }
  };

  const onPrivateSettingsActionDone = index => {
    if (index == 2) {
      return
    }
    var message, actionCallback;
    if (index == 0) {
      actionCallback = onUserBlockPress;
      message = IMLocalized("Are you sure you want to block this user? You won't see their messages again.");
    } else if (index == 1) {
      actionCallback = onUserReportPress;
      message = IMLocalized("Are you sure you want to report this user? You won't see their messages again.");
    }
    Alert.alert(
      IMLocalized("Are you sure?"),
      message,
      [
        {
          text: IMLocalized("Yes"),
          onPress: actionCallback
        },
        {
          text: IMLocalized("Cancel"),
          style: 'cancel',
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.personalChatContainer}>
      <KeyboardAwareView style={styles.personalChatContainer}>
        <MessageThread
          thread={thread}
          user={user}
          appStyles={appStyles}
          onChatMediaPress={onChatMediaPress}
          onSenderProfilePicturePress={onSenderProfilePicturePress}
        />
        <BottomInput
          uploadProgress={uploadProgress}
          value={inputValue}
          onChangeText={onChangeText}
          onSend={onSend}
          appStyles={appStyles}
          onAddMediaPress={() => onAddMediaPress(photoUploadDialogRef)}
        />
        <ActionSheet
          title={IMLocalized('Group Settings')}
          options={[IMLocalized('Rename Group'), IMLocalized('Leave Group'), IMLocalized('Cancel')]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
        />
        <ActionSheet
          title={'Are you sure?'}
          options={['Confirm', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
        />
        <DialogInput
          isDialogVisible={isRenameDialogVisible}
          title={IMLocalized("Change Name")}
          hintInput={channel.name}
          textInputProps={{ selectTextOnFocus: true }}
          submitText={IMLocalized("OK")}
          submitInput={onChangeName}
          closeDialog={() => {
            showRenameDialog(false);
          }}
        />
        <ActionSheet
          ref={photoUploadDialogRef}
          title={IMLocalized('Photo Upload')}
          options={[IMLocalized('Launch Camera'), IMLocalized('Open Photo Gallery'), IMLocalized('Cancel')]}
          cancelButtonIndex={2}
          onPress={onPhotoUploadDialogDone}
        />
        <ActionSheet
          ref={groupSettingsActionSheetRef}
          title={IMLocalized("Group Settings")}
          options={[IMLocalized('Rename Group'), IMLocalized('Leave Group'), IMLocalized('Cancel')]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={onGroupSettingsActionDone}
        />
        <ActionSheet
          ref={privateSettingsActionSheetRef}
          title={IMLocalized("Actions")}
          options={[IMLocalized('Block user'), IMLocalized('Report user'), IMLocalized('Cancel')]}
          cancelButtonIndex={2}
          onPress={onPrivateSettingsActionDone}
        />
        <TNMediaViewerModal
          mediaItems={sortMediafromThread}
          isModalOpen={isMediaViewerOpen}
          onClosed={onMediaClose}
          selectedMediaIndex={selectedMediaIndex}
        />
      </KeyboardAwareView>
    </SafeAreaView>
  );
}

IMChat.propTypes = {
  onSendInput: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeTextInput: PropTypes.func,
  onLaunchCamera: PropTypes.func,
  onOpenPhotos: PropTypes.func,
  onAddMediaPress: PropTypes.func,
  user: PropTypes.object,
  uploadProgress: PropTypes.number,
  isMediaViewerOpen: PropTypes.bool,
  isRenameDialogVisible: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
  onChatMediaPress: PropTypes.func,
  onMediaClose: PropTypes.func,
  showRenameDialog: PropTypes.func,
  onLeave: PropTypes.func,
};

export default IMChat;
