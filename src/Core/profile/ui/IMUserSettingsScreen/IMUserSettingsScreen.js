import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { IMLocalized } from '../../../localization/IMLocalization';
import { setUserData } from '../../../onboarding/redux/auth';
import { firebaseUser } from '../../../firebase';
import IMFormComponent from '../IMFormComponent/IMFormComponent';

class IMUserSettingsScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = navigation.state.params.appStyles;
    let screenTitle = navigation.state.params.screenTitle || IMLocalized('Settings');
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: screenTitle,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    };
  };

  constructor(props) {
    super(props);

    this.appStyles = props.navigation.getParam('appStyles') || props.appStyles;
    this.form = props.navigation.getParam('form') || props.form;
    this.initialValuesDict = props.user.settings || {};

    this.state = {
      form: props.form,
      alteredFormDict: {}
    };

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onFormSubmit = () => {
    const user = this.props.user;
    var newSettings = user.settings || {};
    const form = this.form;
    const alteredFormDict = this.state.alteredFormDict;

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key];
        if (newValue != null) {
          newSettings[field.key] = alteredFormDict[field.key];
        }
      });
    });

    let newUser = { ...user, settings: newSettings };
    firebaseUser.updateUserData(user.id, newUser);
    this.props.setUserData({ user: newUser });
    this.props.navigation.goBack();
  };

  onFormChange = alteredFormDict => {
    this.setState({ alteredFormDict });
  };

  onFormButtonPress = buttonField => {
    this.onFormSubmit();
  }

  render() {
    return (
      <IMFormComponent
        form={this.form}
        initialValuesDict={this.initialValuesDict}
        onFormChange={this.onFormChange}
        navigation={this.props.navigation}
        appStyles={this.appStyles}
        onFormButtonPress={this.onFormButtonPress}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { setUserData })(IMUserSettingsScreen);
