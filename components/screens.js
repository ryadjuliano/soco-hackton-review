/* eslint-disable curly */
import { Platform, Dimensions } from 'react-native';

const dimension = Dimensions.get('window');
const screenWidth = dimension.width;
const screenHeight = dimension.height;
let maxWidthContainer = 1247;
if (screenWidth <= 1240 && screenWidth >= 1084) {
  maxWidthContainer = 1024;
} else if (screenWidth < 1084 && screenWidth >= 991) {
  maxWidthContainer = 940;
} else if (screenWidth < 991) {
  maxWidthContainer = screenWidth;
}
const isWeb = Platform.OS == 'web' && screenWidth >= 991;
const isMobileWeb = Platform.OS == 'web' && screenWidth < 991;
const isWebPlatform = Platform.OS == 'web';
const isNative = Platform.OS == 'android' || Platform.OS == 'ios';
const fullWidth = screenWidth;
const fullHeight = screenHeight;

const isCustomWidth = (width) => {
  return screenWidth <= width;
};

const getPlatformType = () => {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'web';
};

export {
  maxWidthContainer,
  fullWidth,
  fullHeight,
  isWeb,
  isMobileWeb,
  isWebPlatform,
  isNative,
  screenWidth,
  isCustomWidth,
  getPlatformType,
};
