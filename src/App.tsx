/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';
import AppContainer from './routes';

// * Components
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

// * Context
import UserContextProvider from './context/UserContext';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {getParameterByName, iOS} from './public/helper/GlobalHelper';
import NavigationServices from './routes/NavigationServices';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return () => unsubscribe();
  }, []);

  const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
    console.log(link);

    if (link.url === 'https://deals.tropika.club') {
      fetchInitialize(link);
    }
  };

  const fetchInitialize = async (
    link: FirebaseDynamicLinksTypes.DynamicLink,
  ) => {
    let source: any;

    const jwt = await AsyncStorage.getItem('BEARER_TOKEN');

    if (jwt !== null) {
      return;
    }

    let dynamicLink: FirebaseDynamicLinksTypes.DynamicLink = link;

    console.log('masuk sini gak cok');

    if (iOS && !dynamicLink?.url) {
      const url = await Linking.getInitialURL();
      const screenIndex = url?.indexOf('utm_campaign=change-password');

      console.log('url', dynamicLink?.url, url, screenIndex);

      if (screenIndex) {
        if (screenIndex > -1) {
          const txt = 'utm_source=';
          const sourceIndex = url?.lastIndexOf('utm_source=') as number;
          // const sourceRes = url?.substring(sourceIndex);
          // const cidIndex = sourceRes?.indexOf('&cid') as number;

          const utmSource = url?.substring(sourceIndex + txt.length);

          source = utmSource?.split('%26');

          // console.log('email ios ', source);

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
  };

  return (
    <UserContextProvider>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
      <FlashMessage position="top" />
    </UserContextProvider>
  );
};

export default App;
