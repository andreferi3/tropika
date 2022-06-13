import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, ReactNode, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {userServices} from '../public/services';
import {
  ChangePasswordPayload,
  ForgetPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from '../public/services/models/UserModels';
import NavigationServices from '../routes/NavigationServices';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  user: any;
  loading: boolean;
  userLogin: (payload: LoginPayload) => {} | void;
  userRegister: (payload: RegisterPayload) => {} | void;
  forgetPassword: (payload: ForgetPasswordPayload) => {} | void;
  changePassword: (payload: ChangePasswordPayload) => {} | void;
}

export const UserContext = createContext<UserContextValue>({} as any);

const UserContextProvider = (props: UserContextProps) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const userLogin = async (payload: LoginPayload) => {
    setLoading(true);
    const response = await userServices.login(payload);

    if (response.ok) {
      setUser(response.data);
      await AsyncStorage.setItem('BEARER_TOKEN', response.data.data.jwt);
      const autoLoginResponse = await userServices.autoLogin({
        jwt: response.data.data.jwt as string,
      });

      if (autoLoginResponse.ok) {
        setLoading(false);
        if (autoLoginResponse.data?.success) {
          NavigationServices.replace('Main', {
            url: 'https://deals.tropika.club/',
            token: response.data.data.jwt,
          });
        } else {
          showMessage({
            message: "User can't login due to server error",
            type: 'danger',
          });
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (response.data.response.data.data.message) {
        showMessage({
          message: response.data.response.data.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: `Unidentified Error : ${response.data.response.status}`,
          type: 'danger',
        });
      }
    }
  };

  const userRegister = async (payload: RegisterPayload) => {
    setLoading(true);

    const response = await userServices.register(payload);

    if (response.ok) {
      console.log(response.data);
      showMessage({
        message: response.data.message,
        type: 'success',
      });
      NavigationServices.goBack();
    } else {
      if (response.data.response.data.data.message) {
        showMessage({
          message: response.data.response.data.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: `Unidentified Error : ${response.data.response.status}`,
          type: 'danger',
        });
      }
    }

    return setLoading(false);
  };

  const forgetPassword = async (payload: ForgetPasswordPayload) => {
    setLoading(true);
    const response = await userServices.forgetPassword(payload);

    if (response.ok) {
      setLoading(false);
      NavigationServices.navigate('EmailSent', {
        email: payload.email,
      });
    } else {
      setLoading(false);
      if (response.data.response.data.data.message) {
        showMessage({
          message: response.data.response.data.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: `Unidentified Error : ${response.data.response.status}`,
          type: 'danger',
        });
      }
    }
  };

  const changePassword = async (payload: ChangePasswordPayload) => {
    setLoading(true);
    const response = await userServices.changePassword(payload);

    if (response.ok) {
      showMessage({
        message:
          'Your password has been reseted. Please login back with your new password',
        type: 'success',
      });

      NavigationServices.replace('Auth');
    } else {
      if (response.data.response.data.data.message) {
        showMessage({
          message: response.data.response.data.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: `Unidentified Error : ${response.data.response.status}`,
          type: 'danger',
        });
      }
    }

    return setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userLogin,
        userRegister,
        forgetPassword,
        changePassword,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
