import React from 'react';
import { StyleSheet, Pressable, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import * as Facebook from 'expo-facebook';

import * as authActions from '~store/user/actions/auth';
import Colors from '@/components/Colors';

//const Config = require('~config/default.env').default;

const LoginButtonFacebook = ({ title, navigation }) => {
  const dispatch = useDispatch();

  const fbLoginHandler = async () => {
    //fbLogin()
    const { token, error } = (await global.isNative) ? false : fbLoginWeb();
    if (token) {
      const result = await dispatch(
        authActions.facebookLogin({
          acquisition_source: 'facebook',
          access_token: token,
        }),
      );
      if (result.errorCode == 'ALREADY_LOGGED_IN') {
        navigation.navigate('CompleteProfileScreen');
      } else if (result.errorCode) {
        const res = await getUserDetail(token);
        const user = {
          ...res.user,
          facebook_id: res?.user?.id,
          image: res.user?.picture?.data?.url,
        };
        dispatch(authActions.authenticate({ user }));
      }
      navigation.navigate(
        result.isCompleteProfile ? 'HomeScreen' : 'CompleteProfileScreen',
      );
    } else if (error) {
      console.log('The login attempt was cancelled');
    }
  };

  const getUserDetail = async (token) => {
    // Get the user's name using Facebook's Graph API
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,first_name,last_name,picture.height(500)`,
    );
    const res = await response.json();
    return { token, user: res };
  };

  // const fbLogin = async () => {
  //   await Facebook.initializeAsync({
  //     appId: FB_APP_ID,
  //   });
  //   const auth = await Facebook.getAuthenticationCredentialAsync();
  //   if (auth?.token) {
  //     return auth;
  //   }
  //   const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //     permissions: ['public_profile'],
  //   });
  //   if (type === 'success') {
  //     return getUserDetail(token);
  //   } else {
  //     console.log('Not able login');
  //   }
  // };

  const fbLoginWeb = async () => {
    try {
      // eslint-disable-next-line no-undef
      const accessToken = await FB.getAccessToken();
      if (!accessToken) {
        return getUserDetail(accessToken);
      } else {
        // eslint-disable-next-line no-undef
        FB.login(
          function (response) {
            if (response.status === 'connected') {
              return getUserDetail(response.authResponse.accessToken);
            }
          }.bind(this),
          { scope: 'email' },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable style={styles.loginBtn} onPress={fbLoginHandler}>
      <Image
        width={25}
        height={25}
        key="fb"
        style={styles.iconFacebook}
        source={require('@/assets/images/facebook-white.png')}
      />
      <Text style={styles.textFacebook}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    height: 38,
    width: '100%',
  },
  iconFacebook: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  textFacebook: {
    color: Colors.white,
  },
});

LoginButtonFacebook.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
};

LoginButtonFacebook.defaultProps = {
  title: '',
  navigation: {},
};

export default LoginButtonFacebook;
