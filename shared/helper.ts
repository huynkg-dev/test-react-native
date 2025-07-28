import * as CryptoJS from 'crypto-js';
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
const SCREEN_WIDTH = Dimensions.get('window').width;

type ResponsiveConfig = {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
};

const isSmall = () => {
  return SCREEN_WIDTH < 640;
}

const isMedium = () => {
  return SCREEN_WIDTH >= 640 && SCREEN_WIDTH < 768;
}

const isLarge = () => {
  return SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
}

const Responsive = (config: number | ResponsiveConfig): number => {
  if (typeof config === 'number') return config;

  if (isSmall() && config.sm) {
    return config.sm;
  } else if (isMedium() && config.md) {
    return config.md;
  } else if (isLarge() && config.lg) {
    return config.lg;
  }
  return config.base;
};

const GenerateDeviceKey = () => {
  const deviceId = DeviceInfo.getUniqueIdSync();
  const deviceName = DeviceInfo.getDeviceNameSync();
  return CryptoJS.SHA256(`${deviceId}-${deviceName}`).toString();
};

const CONTROL_HEIGHT = Responsive({ base: 48, lg: 55 });

export {
  CONTROL_HEIGHT,
  GenerateDeviceKey,
  Responsive
};

