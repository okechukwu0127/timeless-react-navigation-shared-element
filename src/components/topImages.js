import * as React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

const TopImages = ({
  navigation,
  space = 200,
  prevImage,
  styles,
  item,
  SPACING,
  prevImageRef,
  HEADER_DURATION,
  slideIn,
  HEADER_DELAY,
  nextImageRef,
  nextImage,
  imageRef,
}) => {
  return (
    <>
      <Animatable.Image
        useNativeDriver={true}
        //useNativeDriver={}
        ref={prevImageRef}
        duration={HEADER_DURATION}
        easing="ease-in-out"
        animation={slideIn}
        delay={HEADER_DELAY + 200}
        source={{uri: prevImage}}
        style={[
          styles.image,
          styles.secondaryImage,
          {left: 0, bottom: Platform.OS === 'ios' ? 20 : 30},
        ]}
      />
      <Animatable.Image
        useNativeDriver={true}
        ref={nextImageRef}
        duration={HEADER_DURATION}
        easing="ease-in-out"
        animation={slideIn}
        delay={HEADER_DELAY + 350}
        source={{uri: nextImage}}
        style={[
          styles.image,
          styles.secondaryImage,
          {right: 0, bottom: Platform.OS === 'ios' ? 20 : 30},
        ]}
      />

      <Animatable.Image
        useNativeDriver={true}
        ref={imageRef}
        duration={HEADER_DURATION}
        easing="ease-in-out"
        animation={slideIn}
        delay={HEADER_DELAY}
        source={{uri: item.images?.thumbnailFlatten}}
        style={[
          styles.image,
          {
            marginTop: SPACING,
            borderRadius: 50,
            bottom: Platform.OS === 'ios' ? 0 : -20,
          },
        ]}
      />
    </>
  );
};

export default React.memo(TopImages);
