import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../screens/styles/InvestmentsListDetailStyles';
import {height, width, fonts, IMAGES} from '../config/theme';
import * as Animatable from 'react-native-animatable';
import {getAssetGallery} from '../config/data/timeless';
import TopImages from '../components/topImages';
import GalleryData from '../components/GalleryData';
const BACKDROP_HEIGHT = height * 0.75;

const SPACING = 20;
const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);
const DURATION = 150;
const HEADER_DELAY = 0;
const slideIn = {
  0: {translateY: 250},
  1: {translateY: 0},
};
const slideInBackwards = {
  0: {translateY: 0},
  1: {translateY: 250},
};
const fadeInBottom = {
  0: {opacity: 0, translateY: 100},
  1: {opacity: 1, translateY: 0},
};

const InvestmentsListDetails = ({navigation, route}) => {
  const [cast, setCast] = React.useState(null);
  const [active, setActive] = React.useState(false);

  const [content, setContent] = React.useState('');
  const {item, nextImage, prevImage, humanizeDate, numFormater} = route.params;
  const prevImageRef = React.useRef();
  const nextImageRef = React.useRef();
  const imageRef = React.useRef();
  const scrollViewRef = React.useRef();
  React.useEffect(() => {
    const fetchData = async () => {
      const cast = await getAssetGallery(item.id);
      //console.log(cast);
      setContent(cast[0]?.content);
      setCast(cast);
    };

    if (!cast) {
      fetchData(item.id);
    }
  }, []);


  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar hidden />

      <View style={styles.topContainer}>
        <LinearGradient
          colors={['#3d66b1', '#d1e8ff', 'white']}
          style={styles.LinearG}
        />

        <TopImages
          BACKDROP_HEIGHT={BACKDROP_HEIGHT}
          HEADER_DELAY={HEADER_DELAY}
          prevImageRef={prevImageRef}
          nextImageRef={nextImageRef}
          prevImage={prevImage}
          styles={styles}
          item={item}
          nextImage={nextImage}
          slideIn={slideIn}
          imageRef={imageRef}
        />
      </View>

      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <SharedElement id={`item.${item.key}.image`} style={styles.posterImage}>
          <Image source={{uri: item.thumbnail}} style={styles.posterImage} />
        </SharedElement>
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.containerTwo]}>
        <SharedElement
          id={`item.${item.key}.backdrop`}
          style={[StyleSheet.absoluteFillObject]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.box]} />
        </SharedElement>

        <SharedElement id={`item.${item.key}.category`}>
          <View style={[styles.genre, styles.category]}>
            <Text style={[styles.genreText, {paddingRight: 18}]}>
              {item.category.replace(/_/g, ' ')}
            </Text>

            <View
              style={[
                styles.status,
                {backgroundColor: item.status === 'open' ? 'green' : 'red'},
              ]}>
              <Text style={styles.h20}></Text>
            </View>
          </View>
        </SharedElement>

        <SharedElement id={`item.${item.key}.meta`}>
          <View style={styles.container}>
            <Text style={styles.font18} numberOfLines={1} adjustsFontSizeToFit>
              {item.title}
            </Text>
            <Text style={styles.genreText}>
              Drop date: {humanizeDate(item.date)}
            </Text>
            <View style={styles.buttonD}>
              <Text style={[styles.price, styles.buttonDColor]}>
                {numFormater(item.sharePrice)}
              </Text>
            </View>
          </View>
        </SharedElement>
        <AnimatableScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}>
          <Animatable.View
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 300}
            style={styles.scrollViewD}>
            <Text style={styles.inActiveTab}>Gallery</Text>
            <Text style={styles.inactivTab}>Financials</Text>
            <Text style={styles.inactivTab}>Documents</Text>
            <Text style={styles.inactivTab}>News</Text>
            <Text style={styles.inactivTab}>Talks</Text>
          </Animatable.View>

          {cast && (
            <FlatList
              data={cast}
              keyExtractor={item => item.key}
              contentContainerStyle={{justifyContent: 'space-evenly'}}
              horizontal
              decelerationRate="fast"
              style={{marginBottom: SPACING}}
              snapToInterval={width * 0.66 + SPACING * 2}
              showsHorizontalScrollIndicator={false}
              renderItem={({item: cast, index}) => {
                return (
                  <GalleryData
                    cast={cast}
                    item={item}
                    index={index}
                    SPACING={SPACING}
                    DURATION={DURATION}
                    fadeInBottom={fadeInBottom}
                    width={width}
                  />
                );
              }}
            />
          )}

          <Animatable.Text
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 900}
            style={styles.details}>
            Detail
          </Animatable.Text>
          <Animatable.Text
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 1050}
            style={styles.content}>
            {content}
          </Animatable.Text>
        </AnimatableScrollView>
      </View>

      <View style={styles.headerMain}>
        <TouchableOpacity
          onPress={() => {
            imageRef.current.animate(slideInBackwards, 500),
              scrollViewRef.current.fadeOut(400);
            Promise.all([
              nextImageRef.current.animate(slideInBackwards, 200),
              prevImageRef.current.animate(slideInBackwards, 300),
            ]).then(() => {
              navigation.goBack();
            });
          }}>
          <View style={styles.headerLeft}>
            <Image source={IMAGES.backImage} style={styles.headerIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActive(!active);
          }}>
          <View style={styles.headerRight}>
            <Image
              source={active ? IMAGES.bellActive : IMAGES.bell}
              style={styles.headerIcon2}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 15,
          width: '60%',
          alignSelf: 'center',

          opacity: 0.9,
          backgroundColor: '#3d66b1',
          marginHorizontal: 20,
          borderRadius: 10,
          position: 'absolute',
          flex: 1,
          bottom: 30,
          justifyContent: 'center',
        }}>
        <Text style={{alignSelf: 'center', color: 'white', fontWeight: '600'}}>
          GET STARTED NOW
        </Text>
      </View>
    </SafeAreaView>
  );
};

InvestmentsListDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.backdrop`,
      // animation: 'fade-out',
      // resize: 'none'
    },
    {
      id: `item.${item.key}.meta`,
      animation: 'fade',
      resize: 'none',
    },
    {
      id: `item.${item.key}.image`,
    },

    {
      id: `item.${item.key}.category`,
    },
  ];
};

export default InvestmentsListDetails;
