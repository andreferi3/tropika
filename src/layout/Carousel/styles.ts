import {width} from '../../public/helper/GlobalHelper';
import {createStyles} from '../../styles';
import {isIPhoneWithMonobrow} from '../../public/helper/GetStatusBarHeight';

const styles = createStyles({
  headerLogo: {
    position: 'absolute',
    top: '20rem',
    left: '16rem',
  },
  logoImg: {
    width: '180rem',
    height: '60rem',
    resizeMode: 'contain',
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
  },
  imageOnBoarding: {
    width: `${width - 50}rem`,
    height: '300rem',
    resizeMode: 'contain',
  },
  onBoardingItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width,
  },
  carouselFooter: {
    paddingHorizontal: '16rem',
    marginBottom: isIPhoneWithMonobrow() ? 0 : '30rem',
  },
});

export default styles;
