import {Dimensions, Platform} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const {width, height} = Dimensions.get('screen');
export const iOS = Platform.OS === 'ios';

export function isError(formik: any, fieldName: string) {
  if (formik.touched[fieldName] && formik.errors[fieldName]) {
    return formik.errors[fieldName];
  }
}

export async function buildLink() {
  const link = await dynamicLinks().buildLink({
    link: 'https://deals.tropika.club/',
    domainUriPrefix: 'https://tropika.page.link',
    analytics: {
      campaign: 'change-password',
      source: 'andreferi135@gmail.com&198932',
    },
    android: {
      packageName: 'com.tropika',
    },
    ios: {
      bundleId: 'com.tropika',
    },
  });

  console.log(link);

  return link;
}

export function getParameterByName(name: string, url: string) {
  name = name.replace(/[\\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
