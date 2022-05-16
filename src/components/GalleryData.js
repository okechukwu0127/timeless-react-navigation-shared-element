import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import {Image, Text} from 'react-native';

const GalleryData = ({fadeInBottom, DURATION, SPACING, cast, index, width}) => {
  return (
    <Animatable.View
      useNativeDriver
      animation={fadeInBottom}
      delay={DURATION + 300 + (index + 1) * 150}
      style={{
        marginRight: SPACING,
        alignItems: 'center',
      }}>
      <Image
        source={{uri: cast.thumbnailUrl}}
        style={{
          borderRadius: 16,
          width: width * 0.33,
          height: width * 0.4,
          resizeMode: 'cover',
          borderWidth: 0.3,
          borderColor: '#eee',
          marginBottom: SPACING / 2,
        }}
      />
      <Text
        style={{
          fontSize: 12,
        }}>
        {cast.name}
      </Text>
    </Animatable.View>
  );
};

export default React.memo(GalleryData);
