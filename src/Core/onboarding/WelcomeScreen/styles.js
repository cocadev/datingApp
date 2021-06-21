import { DynamicStyleSheet } from 'react-native-dark-mode';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles) => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    logo: {
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      marginTop: -100
    },
    logoImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
      tintColor: appStyles.colorSet.mainThemeForegroundColor
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet.mainThemeForegroundColor,
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 50,
      marginBottom: 20,
      textAlign: "center",
      color: appStyles.colorSet.mainTextColor,
    },
    loginContainer: {
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      marginTop: 30,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginText: {
      color: appStyles.colorSet.mainThemeBackgroundColor,
    },
    signupContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      borderRadius: appStyles.sizeSet.radius,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: appStyles.colorSet.mainThemeForegroundColor,
      marginTop: 20,
      height: 45
    },
    signupText: {
      color: appStyles.colorSet.mainThemeForegroundColor,
    },
  })
};

export default dynamicStyles;
