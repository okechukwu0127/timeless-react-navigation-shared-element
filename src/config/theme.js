import { Dimensions } from 'react-native';

export const {width, height} = Dimensions.get('window');
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;
export const ITEM_WIDTH = width * 0.6;

export const foodConfig = {
  colors: {
    orange: '#FB9B06',
  },
};

export const IMAGES = {
  filterImage: require('./../assets/filter.png'),
  backImage: require('./../assets/back.png'),
  bell: require('./../assets/bell.png'),
  bellActive: require('./../assets/bell_active.png'),
};
