import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import GlobalStyles from '../public/styles/GlobalStyles';
import {RootStackRoutesProps} from '../routes';
import NavigationServices from '../routes/NavigationServices';

interface Props {}

const HomeScreen2 = () => {
  const route = useRoute<RouteProp<RootStackRoutesProps, 'Main2'>>();

  const {url, token, source} = route.params;

  return (
    <SafeAreaView style={[GlobalStyles.flexFill, GlobalStyles.bgWhite]}>
      {source ? (
        <WebView
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          domStorageEnabled
          cacheEnabled
          javaScriptEnabled
          source={{
            html: source,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          onLoadStart={e => {
            if (!e.nativeEvent.loading) {
              if (e.nativeEvent.url !== url) {
                return NavigationServices.navigate('Main', {
                  url: e.nativeEvent.url,
                  token,
                });
              }
            }
          }}
          style={GlobalStyles.h100}
        />
      ) : (
        <WebView
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          domStorageEnabled
          cacheEnabled
          javaScriptEnabled
          source={{
            uri: url,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          onLoadStart={e => {
            if (!e.nativeEvent.loading) {
              if (e.nativeEvent.url !== url) {
                return NavigationServices.navigate('Main', {
                  url: e.nativeEvent.url,
                  token,
                });
              }
            }
          }}
          style={GlobalStyles.h100}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen2;
