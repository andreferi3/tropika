import React, {useState, FC} from 'react';
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Animated,
} from 'react-native';

import {onBoardData} from '../../public/constants/GlobalConstant';

// * Component
import CarouselImage from './CarouselImage';
import Pagination from './Pagination';
import CButton from '../../components/CButton';

// * Styling
import styles from './styles';
import {Images} from '../../assets/themes';
import GlobalStyles from '../../public/styles/GlobalStyles';

interface IProps {
  onStartPress: () => {} | void;
}

const CarouselComponent: FC<IProps> = ({onStartPress}) => {
  let [currIndex, setCurrIndex] = useState(0);
  const _scrollViewRef = React.createRef<any>();

  let [_btnOpacity] = useState(new Animated.Value(0));

  const setSelectedIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);

    if (selectedIndex === 2) {
      Animated.timing(_btnOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(_btnOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    setCurrIndex(selectedIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.headerLogo}>
        <Image source={Images.tropikaImg} style={styles.logoImg} />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setSelectedIndex}
        showsHorizontalScrollIndicator={false}
        ref={_scrollViewRef}>
        <CarouselImage data={onBoardData} />
      </ScrollView>
      <View style={styles.carouselFooter}>
        <Pagination currIndex={currIndex} data={onBoardData} />
        <Animated.View
          style={[GlobalStyles.flexRowCenter, {opacity: _btnOpacity}]}>
          <View style={[GlobalStyles.flexFill]}>
            <CButton bold disabled={currIndex < 2} onPress={onStartPress}>
              Get Started
            </CButton>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default CarouselComponent;
