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
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';

//import {ITEM_SIZE} from './MoviesList';
import {height, width, fonts} from '../config/theme';
const TOP_HEADER_HEIGHT = height * 0.3;
import * as Animatable from 'react-native-animatable';
import {getAssetGallery} from '../config/data/timeless';
const BACKDROP_HEIGHT = height * 0.75;

export const ITEM_WIDTH = width * 0.68;
export const SPACING = 20;
const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);
const DURATION = 150;
const HEADER_DURATION = 1000;
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

  const [content,setContent] = React.useState('')
  const {item, nextImage, prevImage, humanizeDate} = route.params;
  const prevImageRef = React.useRef();
  const nextImageRef = React.useRef();
  const imageRef = React.useRef();
  const scrollViewRef = React.useRef();
  React.useEffect(() => {
    const fetchData = async () => {
      const cast = await getAssetGallery(item.id);
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setCast(cast);
    };

    if (!cast) {
      fetchData(item.id);
    }
  }, [item.id]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />

      <View
        style={{
          position: 'absolute',
          flexWrap: 'nowrap',
          top: 0,
          width,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#3d66b1',
        }}>
        <LinearGradient
          colors={['#3d66b1', '#d1e8ff', 'white']}
          style={{
            height: BACKDROP_HEIGHT / 2,
            width,
            position: 'absolute',
            top: 0,
          }}
        />
        <Animatable.Image
          useNativeDriver
          ref={prevImageRef}
          duration={HEADER_DURATION}
          easing="ease-in-out"
          animation={slideIn}
          delay={HEADER_DELAY + 200}
          source={{uri: prevImage}}
          style={[styles.image, styles.secondaryImage, {left: 0, bottom: 20}]}
        />
        <Animatable.Image
          useNativeDriver
          ref={nextImageRef}
          duration={HEADER_DURATION}
          easing="ease-in-out"
          animation={slideIn}
          delay={HEADER_DELAY + 350}
          source={{uri: nextImage}}
          style={[styles.image, styles.secondaryImage, {right: 0, bottom: 20}]}
        />
        <Animatable.Image
          useNativeDriver
          ref={imageRef}
          duration={HEADER_DURATION}
          easing="ease-in-out"
          animation={slideIn}
          delay={HEADER_DELAY}
          source={{uri: item.images?.thumbnailFlatten}}
          style={[styles.image, {marginTop: SPACING, borderRadius: 50}]}
        />
      </View>

      <View
        style={[
          StyleSheet.absoluteFillObject,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <SharedElement id={`item.${item.key}.image`} style={styles.posterImage}>
          <Image source={{uri: item.thumbnail}} style={styles.posterImage} />
        </SharedElement>
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {top: TOP_HEADER_HEIGHT, padding: SPACING},
        ]}>
        <SharedElement
          id={`item.${item.key}.backdrop`}
          style={[StyleSheet.absoluteFillObject]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'white',
                borderRadius: 34,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              },
            ]}
          />
        </SharedElement>

        <SharedElement id={`item.${item.key}.category`}>
          <View
            style={[
              styles.genre,
              {width: 'auto', marginBottom: 10, alignSelf: 'center'},
            ]}>
            <Text style={[styles.genreText, {paddingRight: 18}]}>
              {item.category.replace(/_/g, ' ')}
            </Text>

            <View
              style={{
                position: 'absolute',
                borderRadius: 10,
                right: 0,
                width: 20,
                height: 20,
                backgroundColor: item.status === 'open' ? 'green' : 'red',
              }}>
              <Text style={{height: 20}}></Text>
            </View>
          </View>
        </SharedElement>

        <SharedElement id={`item.${item.key}.meta`}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}} numberOfLines={1} adjustsFontSizeToFit>
              {item.title}
            </Text>
            <Text style={styles.genreText}>
              Drop date: {humanizeDate(item.date)}
            </Text>
            <View
              style={{
                marginTop: 20,
                backgroundColor: '#3d66b1',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={[styles.price, {color: 'white', fontWeight: '500'}]}>
                ${item.sharePrice}
              </Text>
            </View>
            {/* <Rating rating={item.rating} />
            <Genres genres={item.genres} /> */}
          </View>
        </SharedElement>
        <AnimatableScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}>
          <Animatable.View
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 300}
            style={{
              //...fonts.montserratBold,

              fontSize: 18,
              marginTop: 40,
              color: 'grey',
              marginBottom: SPACING,
              flexDirection: 'row',
              padding: 7,
              justifyContent: 'space-around',
              backgroundColor: '#f2f6fa8c',
            }}>
            <Text style={{color: '#3d66b1', fontWeight: '300'}}>Gallery</Text>
            <Text style={{color: 'grey', fontSize: 12}}>Financials</Text>
            <Text style={{color: 'grey', fontSize: 12}}>Documents</Text>

            <Text style={{color: 'grey', fontSize: 12}}>News</Text>
            <Text style={{color: 'grey', fontSize: 12}}>Talks</Text>
          </Animatable.View>

          {cast && (
            <FlatList
              data={cast}
              keyExtractor={item => item.key}
              contentContainerStyle={{justifyContent: 'space-evenly'}}
              horizontal
              decelerationRate="fast"
              // 2 by 2
              style={{marginBottom: SPACING}}
              snapToInterval={width * 0.66 + SPACING * 2}
              showsHorizontalScrollIndicator={false}
              renderItem={({item: cast, index}) => {
                if (index < 1) {
                  setContent(cast.content);
                 
                }
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
              }}
            />
          )}
          <Animatable.Text
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 900}
            style={{
              color: 'grey',
              fontSize: 18,
              marginBottom: SPACING,
              marginTop: SPACING + 0,
            }}>
            Detail
          </Animatable.Text>
          <Animatable.Text
            useNativeDriver
            animation={fadeInBottom}
            delay={DURATION + 1050}
            style={{
              
              fontSize: 13,
              lineHeight: 20,
            }}>
            {content}
          </Animatable.Text>
        </AnimatableScrollView>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          <View
            style={{
              width: 40,
              height: 40,
              
              borderWidth: 0.5,
              borderColor: '#ccc',
              borderRadius: 17,
              top: SPACING - 40,
              left: SPACING - 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                require('./../assets/back.png')
              }
              style={{width: 20, height: 20}}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActive(!active);
          }}>
          <View
            style={{
              width: 35,
              height: 35,
              
              borderColor: '#ccc',
              borderRadius: 17,
              top: SPACING - 40,
              left: SPACING - 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                active
                  ? require('./../assets/bell_active.png')
                  : require('./../assets/bell.png')
              }
              style={{width: 30, height: 30}}
            />
          </View>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  secondaryImage: {
    position: 'absolute',
    width: width * 0.33,
    height: width * 0.33 * 1.5,
    bottom: (width * 0.33 * 1.5) / 2,
    
  },
  image: {
    width: width * 0.55,
    height: width * 0.55 * 1.5,
    resizeMode: 'contain',
    borderRadius: 16,
  },
  posterImage: {
    opacity: 0,
    transform: [{scale: 0}],
    width: 10,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    opacity: 0.4,
  },
});
export default InvestmentsListDetails;
