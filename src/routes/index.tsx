import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationServices';

// * Bunch list of Screen
import HomeScreen from '../screens/HomeScreen';
import OnBoardingScreen from '../screens/Auth/OnBoardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgetPasswordScreen from '../screens/Auth/ForgetPasswordScreen';
import EmailSentScreen from '../screens/Auth/EmailSentScreen';
import LoadingScreen from '../screens/LoadingScreen';
import TestScreen from '../screens/HomeScreen2';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';

export type RootStackRoutesProps = {
  AuthLoading: undefined;
  ChangePassword: {
    email: string;
    code: string;
  };
  Main: {
    url: string;
    token: string;
  };
  Main2: {
    url: string;
    token: string;
  };
  Auth: undefined;
};

export type AuthStackRoutesProps = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EmailSent: {
    email: string;
  };
};

const MainStack = createStackNavigator<RootStackRoutesProps>();
const AuthStack = createStackNavigator();

const AuthStackRoutes = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgetPasswordScreen}
      />
      <AuthStack.Screen name="EmailSent" component={EmailSentScreen} />
    </AuthStack.Navigator>
  );
};

const Routes = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AuthLoading">
      <MainStack.Screen name="AuthLoading" component={LoadingScreen} />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <MainStack.Screen name="Auth" component={AuthStackRoutes} />
      <MainStack.Screen name="Main" component={HomeScreen} />
      <MainStack.Screen name="Main2" component={TestScreen} />
    </MainStack.Navigator>
  );
};

const config = {
  screens: {
    ChangePassword: {
      path: 'change-password/:params',
      parse: {
        params: (params: string) => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['https://deals.tropika.club/', 'tropika://change-password'],
  config,
};

const AppContainer = () => {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Routes />
    </NavigationContainer>
  );
};

export default AppContainer;
