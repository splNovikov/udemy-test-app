import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import background from '../../assets/sb.png';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/auth';

const mapDispatchToProps = dispatch => ({
  onLogin: authData => dispatch(tryAuth(authData))
});

@connect(null, mapDispatchToProps)
class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);

    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      ...prevState,
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };

    this.props.onLogin(authData);
    startMainTabs();
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    const equalControl = this.state.controls[key].validationRules.equalTo;

    if (equalControl) {
      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid: key === 'password'
            ? validate(
              prevState.controls.confirmPassword.value,
              prevState.controls.confirmPassword.validationRules,
              connectedValue)
            : prevState.controls.confirmPassword.valid
        },
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(value, prevState.controls[key].validationRules, connectedValue),
          touched: true
        }
      },
    }));
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={this.state.viewMode === 'portrait'
            ? styles.portraitPasswordWrapper
            : styles.landscapePasswordWrapper}>
          <DefaultInput placeholder='Confirm Password'
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry />
        </View>
      )
    }

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground source={background}
                       style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container}
                              behavior='padding'>
          {headingText}
          <ButtonWithBackground onPress={this.switchAuthModeHandler}
                                color='#29aaf4'>
            Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput placeholder='Your E-Mail Address'
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={val => this.updateInputState('email', val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address' />
              <View
                style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer}>
                <View
                  style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper}>
                  <DefaultInput placeholder='Password'
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={val => this.updateInputState('password', val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground onPress={this.loginHandler}
                                color='#29aaf4'
                                disabled={
                                  !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                                  !this.state.controls.password.valid ||
                                  !this.state.controls.email.valid
                                }
          >
            Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

export default AuthScreen;
