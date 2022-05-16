import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';

export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.75;

import {width, height} from '../config/theme';

const BackDropItem = React.memo(({item, index, scrollX, investments}) => {
  if (!item.dropImage) {
    return null;
  }

  const translateX = scrollX.interpolate({
    inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
    outputRange: [0, width],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      removeClippedSubviews={Platform.OS === 'ios'}
      style={[
        styles.container,
        {
          width: translateX,
        },
      ]}>
      <Image
        source={{uri: item.dropImage}}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
        }}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height,
    overflow: 'hidden',
  },
});

export default BackDropItem;
