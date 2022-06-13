import React, {useContext} from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import CHeader from '../../components/CHeader';

// * Components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// * Styles & Assets
import {Images} from '../../assets/themes';
import styles from './Styles/LoginStyle';
import FormLogin from '../../layout/Forms/FormLogin';

// * Helper
import NavigationServices from '../../routes/NavigationServices';
import {UserContext} from '../../context/UserContext';

const LoginScreen = () => {
  const {loading, userLogin} = useContext(UserContext);

  return (
    <SafeAreaView style={styles.wrapper}>
      <CHeader
        title="Login"
        rightButton="Register"
        onRightButtonPress={() => NavigationServices.navigate('Register')}
      />

      <KeyboardAwareScrollView style={styles.contentScrollView}>
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.headerLogo}>
            <Image source={Images.tropikaCircleImg} style={styles.logo} />
          </View>

          {/* Form */}
          <FormLogin
            isLoading={loading}
            onSubmit={values => userLogin(values)}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.backgroundBottomWrapper}>
        <Image
          source={Images.backgroundBottom}
          style={styles.backgroundBottom}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
