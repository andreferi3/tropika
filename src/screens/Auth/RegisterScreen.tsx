import React, {useContext} from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import CHeader from '../../components/CHeader';

// * Components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// * Styles & Assets
import {Images} from '../../assets/themes';
import styles from './Styles/LoginStyle';
import FormRegister, {TInitialValues} from '../../layout/Forms/FormRegister';

// * Helper
import NavigationServices from '../../routes/NavigationServices';
import {UserContext} from '../../context/UserContext';
import moment from 'moment';

const RegisterScreen = () => {
  const {loading, userRegister} = useContext(UserContext);

  const handleSubmit = (values: TInitialValues) => {
    const payload = {
      ...values,
      user_meta: {
        yith_birthday: moment(values.dob).format('YYYY-MM-DD'),
      },
    };

    delete payload.dob;

    userRegister(payload);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <CHeader
        title="Register"
        rightButton="Login"
        onRightButtonPress={() => NavigationServices.goBack()}
      />

      <KeyboardAwareScrollView style={styles.contentScrollView}>
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.headerLogo}>
            <Image source={Images.tropikaCircleImg} style={styles.logo} />
          </View>

          {/* Form */}
          <FormRegister isLoading={loading} onSubmit={handleSubmit} />
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

export default RegisterScreen;
