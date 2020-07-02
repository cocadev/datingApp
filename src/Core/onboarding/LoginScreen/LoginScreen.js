import React, { useState } from 'react';
import { Text, TextInput, View, Alert, TouchableOpacity, Image } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { setUserData } from '../redux/auth';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';

const LoginScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles = (props.navigation.state.params.appStyles || props.navigation.getParam('appStyles'));
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const appConfig = (props.navigation.state.params.appConfig || props.navigation.getParam('appConfig'));

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user) {
          const user = response.user;
          props.setUserData(user);
          props.navigation.navigate('MainStack', { user: user });
        } else {
          setLoading(false);
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          });
        }
      })
  };

  const onFBButtonPress = () => {
    authManager
      .loginOrSignUpWithFacebook(appConfig.appIdentifier)
      .then(response => {
        if (response.user) {
          const user = response.user;
          props.setUserData(user);
          props.navigation.navigate('MainStack', { user: user });
        } else {
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          });
        }
      });
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => props.navigation.goBack()}
        >
          <Image style={appStyles.styleSet.backArrowStyle} source={appStyles.iconSet.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized('Sign In')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={IMLocalized('Password')}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
        />
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}
        >
          {IMLocalized('Log In')}
        </Button>
        <Text style={styles.orTextStyle}> {IMLocalized('OR')}</Text>
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => onFBButtonPress()}
        >
          {IMLocalized('Login With Facebook')}
        </Button>
        {appConfig.isSMSAuthEnabled && (
          <Button
            containerStyle={styles.phoneNumberContainer}
            onPress={() => props.navigation.goBack()}
          >
            {IMLocalized('Login with phone number')}
          </Button>
        )}

        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {
  setUserData
})(LoginScreen);
