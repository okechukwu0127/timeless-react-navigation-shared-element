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
import BackDropItem from '../components/BackDropItem';

export const SPACING = 10;
//export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
//const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.75;

import {width, height} from '../config/theme';

const Backdrop = React.memo(({investments, scrollX}) => {
  return (
    <View style={styles.container}>
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
        renderItem={({item, index}) => (
          <BackDropItem item={item} index={index} scrollX={scrollX} />
        )}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#3d66b1']}
        style={styles.LinearGd}
      />
    </View>
  );
});

export default Backdrop;

const styles = StyleSheet.create({
  container: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
  },
  LinearGd: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
});
