// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
// import AsyncStorage from '@react-native-community/async-storage';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   RefreshControl,
//   ActivityIndicator,
//   ToastAndroid,
//   BackHandler,
//   SafeAreaView,
//   Image,
// } from 'react-native';
// import WebView from 'react-native-webview';
// import {WebViewNavigationEvent} from 'react-native-webview/lib/WebViewTypes';
// import NetInfo from '@react-native-community/netinfo';

// import GlobalStyles from '../public/styles/GlobalStyles';
// import CText from '../components/CText';
// import {Colors, Images} from '../assets/themes';
// import {createStyles} from '../styles';
// import CButton from '../components/CButton';
// import RNRestart from 'react-native-restart';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import NavigationServices from '../routes/NavigationServices';
// import {userServices} from '../public/services';
// import {iOS} from '../public/helper/GlobalHelper';
// import {RouteProp, useRoute} from '@react-navigation/core';
// import {RootStackRoutesProps} from '../routes';

// const INJECTED_JS = `
//   const meta = document.createElement('meta');
//   meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
//   meta.setAttribute('name', 'viewport');
//   document.getElementsByTagName('head')[0].appendChild(meta);
//   ale

//   window.onscroll = function() {
//     window.ReactNativeWebView.postMessage(
//       JSON.stringify({
//         scrollTop: document.documentElement.scrollTop || document.body.scrollTop
//       }),
//     )
//   }
// `;

// let backPressed = 0;

// const Home2 = () => {
//   const route = useRoute<RouteProp<RootStackRoutesProps, 'Main2'>>();

//   const [webUrl, setWebUrl] = useState('https://tropika.on-dev.info');
//   const [isPullToRefreshEnabled, setIsPullToRefreshEnabled] =
//     useState<boolean>(false);
//   const [scrollViewHeight, setScrollViewHeight] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [token, setToken] = useState<string | null>();
//   const [loading, setLoading] = useState(true);

//   const [isConnected, setIsConnected] = useState<boolean | null>(true);

//   const {url, token} = route.params;

//   let _webViewRef: any = useRef();

//   useEffect(() => {
//     // fetchInitialize();
//     BackHandler.addEventListener('hardwareBackPress', () => handleBackButton());
//   }, []);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     if (webUrl.indexOf('customer-logout') > -1) {
//       setTimeout(async () => {
//         await AsyncStorage.clear();
//       });

//       return NavigationServices.replace('Auth');
//     }

//     return () => {
//       unsubscribe();
//     };
//   }, [webUrl]);

//   // const fetchInitialize = async () => {
//   //   setLoading(true);

//   //   await AsyncStorage.getItem('BEARER_TOKEN').then(value => setToken(value));

//   //   const response = await userServices.autoLogin({jwt: String(token)});

//   //   if (response.ok) {
//   //     console.log(response.data);
//   //     setWebUrl('https://tropika.on-dev.info/#');
//   //   } else {
//   //     console.log('error : ', response.data);
//   //   }

//   //   return setLoading(false);
//   // };

//   const onRefresh = () => _webViewRef.current.reload();

//   const onWebViewMessage = (e: any) => {
//     const {data} = e.nativeEvent;

//     console.log(data);

//     try {
//       const {scrollTop} = JSON.parse(data);
//       setIsPullToRefreshEnabled(scrollTop === 0);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleBackButton = () => {
//     if (backPressed > 0) {
//       BackHandler.exitApp();
//       backPressed = 0;
//     } else {
//       backPressed++;
//       ToastAndroid.show('Press Again To Exit', ToastAndroid.SHORT);
//       setTimeout(() => {
//         backPressed = 0;
//       }, 3000);
//       return true;
//     }
//   };

//   if (!isConnected) {
//     return (
//       <SafeAreaView style={[GlobalStyles.flexFill, GlobalStyles.bgWhite]}>
//         <KeyboardAwareScrollView bounces={false}>
//           <View style={[GlobalStyles.alignCenter, GlobalStyles.mt5]}>
//             <Image source={Images.noData} style={styles.noInetImg} />

//             <CText bold style={[GlobalStyles.size22]} color={Colors.$black}>
//               No Internet Connection
//             </CText>

//             <CText
//               center
//               color={Colors.$midGrey}
//               style={[GlobalStyles.mt2, GlobalStyles.mb2]}>
//               {'Please check your internet connection\nand try again'}
//             </CText>

//             <View style={[GlobalStyles.flexRowCenter, GlobalStyles.mt5]}>
//               <CButton
//                 btnStyle={[GlobalStyles.flex5]}
//                 onPress={() => {
//                   RNRestart.Restart();
//                 }}>
//                 Try Again
//               </CButton>
//             </View>
//           </View>
//         </KeyboardAwareScrollView>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.scrollView, {backgroundColor: 'white'}]}>
//       {loading ? (
//         <View style={[GlobalStyles.contentContainerCenter]}>
//           <ActivityIndicator size="large" />
//         </View>
//       ) : (
//         <KeyboardAwareScrollView
//           onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
//           style={styles.scrollView}
//           refreshControl={
//             <RefreshControl
//               refreshing={false}
//               enabled={isPullToRefreshEnabled}
//               onRefresh={onRefresh}
//               tintColor="transparent"
//               colors={['transparent']}
//               style={{backgroundColor: 'transparent'}}
//             />
//           }>
//           <WebView
//             cacheEnabled
//             enableApplePay
//             sharedCookiesEnabled
//             thirdPartyCookiesEnabled
//             cacheMode="LOAD_DEFAULT"
//             ref={_webViewRef}
//             source={{
//               uri: webUrl,
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }}
//             style={{webHeight: '100%', height: scrollViewHeight}}
//             onMessage={onWebViewMessage}
//             onLoadStart={(event: WebViewNavigationEvent) => {
//               setIsLoading(true);
//               setWebUrl(event.nativeEvent.url);
//             }}
//             onLoad={() => setIsLoading(false)}
//             injectedJavaScript={INJECTED_JS}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//           />
//         </KeyboardAwareScrollView>
//       )}
//       {isLoading && !iOS && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="red" style={styles.loading} />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = createStyles({
//   scrollView: {
//     flex: 1,
//     height: '100%',
//   },
//   body: {
//     flex: 1,
//   },
//   loader: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loading: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   noInetImg: {
//     width: '280rem',
//     height: '280rem',
//     resizeMode: 'contain',
//   },
// });

// export default Home2;

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

  const {url, token} = route.params;

  return (
    <SafeAreaView style={[GlobalStyles.flexFill, GlobalStyles.bgWhite]}>
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
    </SafeAreaView>
  );
};

export default HomeScreen2;
