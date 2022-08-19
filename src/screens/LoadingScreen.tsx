import React, {useEffect} from 'react';
import {View, ActivityIndicator, Linking} from 'react-native';
import {Colors} from '../assets/themes';
import CText from '../components/CText';
import AsyncStorage from '@react-native-community/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import GlobalStyles from '../public/styles/GlobalStyles';
import NavigationServices from '../routes/NavigationServices';
import {userServices} from '../public/services';
// import {iOS} from '../public/helper/GlobalHelper';
import {showMessage} from 'react-native-flash-message';
import {getParameterByName} from '../public/helper/GlobalHelper';

const LoadingScreen = () => {
  useEffect(() => {
    fetchInitialize();
  }, []);

  const fetchInitialize = async () => {
    let source: any;

    const jwt = await AsyncStorage.getItem('BEARER_TOKEN');

    const dynamicLink = await dynamicLinks().getInitialLink();
    const url = await Linking.getInitialURL();

    console.log('url loading', url, typeof url);

    if (url) {
      const screenIndex = url?.indexOf('utm_campaign=change-password');

      console.log('url', url);

      if (screenIndex) {
        if (screenIndex > -1) {
          const txt = 'utm_source=';
          const sourceIndex = url?.lastIndexOf('utm_source=') as number;
          // const sourceRes = url?.substring(sourceIndex);
          // const cidIndex = sourceRes?.indexOf('&cid') as number;

          const utmSource = url?.substring(sourceIndex + txt.length);

          source = utmSource?.split('&');

          console.log('email ios ', source);

          return NavigationServices.replace('ChangePassword', {
            email: source[0],
            code: source[1],
          });
        }
      }
    } else {
      if (dynamicLink?.url) {
        const email = getParameterByName('email', dynamicLink.url);
        const code = getParameterByName('code', dynamicLink.url);

        return NavigationServices.replace('ChangePassword', {
          email,
          code,
        });
      }
    }

    if (jwt !== null) {
      const response = await userServices.autoLogin({jwt});

      if (response.ok) {
        if (response.data) {
          if (response.data?.success) {
            return NavigationServices.replace('Main', {
              url: 'https://deals.tropika.club/',
              token: jwt,
            });
          }

          return NavigationServices.replace('Main', {
            source: response.data,
            token: jwt,
          });
        } else {
          showMessage({
            message: "Logged out, due to can't authenticate user",
            type: 'danger',
          });

          await AsyncStorage.clear();

          return NavigationServices.replace('Auth');
        }
      }
    } else {
      return NavigationServices.replace('Auth');
    }
  };

  return (
    <View
      style={[
        GlobalStyles.flexFill,
        GlobalStyles.justifyContentCenter,
        GlobalStyles.alignCenter,
      ]}>
      <ActivityIndicator size="large" color={Colors.$primary} />
      <CText bold color={Colors.$primary} style={[GlobalStyles.mt2]}>
        Checking User
      </CText>
    </View>
  );
};

export default LoadingScreen;
