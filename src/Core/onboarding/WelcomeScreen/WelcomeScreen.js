import React, { useState, useEffect } from 'react';
import Button from 'react-native-button';
import { Text, View, Image } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';

const WelcomeScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const appStyles =
    props.navigation.state.params.appStyles || props.navigation.getParam('appStyles');
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const appConfig =
    props.navigation.state.params.appConfig || props.navigation.getParam('appConfig');

  useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    setIsLoading(true);
    authManager
      .retrievePersistedAuthUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          const user = response.user;
          props.setUserData(user);
          props.navigation.navigate('MainStack', { user: user });
        }
      })
  };

  if (isLoading == true) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={appStyles.iconSet.logo} />
      </View>
      <Text style={styles.title}>{appConfig.onboardingConfig.welcomeTitle}</Text>
      <Text style={styles.caption}>
        {appConfig.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => {
          appConfig.isSMSAuthEnabled
            ? props.navigation.navigate('Sms', {
              isSigningUp: false,
              appStyles,
              appConfig,
            })
            : props.navigation.navigate('Login', { appStyles, appConfig });
        }}
      >
        {IMLocalized('Log In')}
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => {
          appConfig.isSMSAuthEnabled
            ? props.navigation.navigate('Sms', {
              isSigningUp: true,
              appStyles,
              appConfig,
            })
            : props.navigation.navigate('Signup', { appStyles, appConfig });
        }}
      >
        {IMLocalized('Sign Up')}
      </Button>
    </View>
  );
};


const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {
  setUserData
})(WelcomeScreen);
