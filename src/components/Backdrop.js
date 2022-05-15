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

const Backdrop = React.memo(({investments, scrollX}) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: 'absolute',
      }}>
      <StatusBar hidden />

      <FlatList
        data={investments}
        keyExtractor={item => item.key + '-backdrop'}
        removeClippedSubviews={Platform.OS === 'ios'}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          width: width,
          height: BACKDROP_HEIGHT,
        }}
        renderItem={({item, index}) => {
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
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
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
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#3d66b1']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
});

export default Backdrop;
