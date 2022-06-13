import {width} from '../../../public/helper/GlobalHelper';
import {createStyles} from '../../../styles';

const styles = createStyles({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentScrollView: {
    zIndex: 99,
  },
  contentWrapper: {
    padding: '16rem',
    zIndex: 99,
  },
  headerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '7rem',
    marginBottom: '40rem',
  },
  logo: {
    width: '140rem',
    height: '140rem',
    resizeMode: 'contain',
  },
  backgroundBottomWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  backgroundBottom: {
    width,
    height: '120rem',
    resizeMode: 'cover',
    zIndex: 1,
  },
  checkedImg: {
    width: '120rem',
    height: '120rem',
    resizeMode: 'contain',
    marginTop: '15rem',
    marginBottom: '32rem',
  },
});

export default styles;
