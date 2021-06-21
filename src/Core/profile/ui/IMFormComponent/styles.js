import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.whiteSmoke,
    },
    //Profile Settings
    settingsTitleContainer: {
      width: '100%',
      height: 55,
      justifyContent: 'flex-end',
    },
    settingsTitle: {
      color: appStyles.colorSet.mainSubtextColor,
      paddingLeft: 10,
      fontSize: 14,
      paddingBottom: 6,
      fontWeight: '500',
    },
    settingsTypesContainer: {
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    settingsTypeContainer: {
      borderBottomColor: appStyles.colorSet.whiteSmoke,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    settingsType: {
      color: appStyles.colorSet.mainThemeForegroundColor,
      fontSize: 14,
      fontWeight: '500',
    },

    //Edit Profile
    contentContainer: {
      width: '100%',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: appStyles.colorSet.hairlineColor,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    divider: {
      height: 0.5,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet.hairlineColor,
    },
    text: {
      fontSize: 14,
      color: appStyles.colorSet.mainTextColor,
    },

    //app Settings
    appSettingsTypeContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    appSettingsSaveContainer: {
      marginTop: 4,
      height: 45,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    placeholderTextColor: { color: appStyles.colorSet.hairlineColor },
  })
};

export default dynamicStyles;
