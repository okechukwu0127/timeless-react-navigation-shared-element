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

export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

import {width, height} from '../config/theme';

const AssetCards = ({navigation, item, investments, index, scrollX}) => {
  const inputRange = [
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
    (index + 1) * ITEM_SIZE,
  ];
    
    function humanizeDate(dateString) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 50, 100],
    extrapolate: 'clamp',
  });

  return (
    <TouchableWithoutFeedback
      onPress={
        () => {
         // console.log(item.images.thumbnailFlatten);
          //console.log(investments[index - 1]?.images?.thumbnailFlatten);
          //console.log(investments[index +1]?.images?.thumbnailFlatten);



          navigation.navigate('InvestmentsListDetails', {
            item,
            humanizeDate,
             prevImage: investments[index - 1]?.images.thumbnailFlatten,
            nextImage: investments[index + 1]?.images.thumbnailFlatten,
          });
        }
      }>
      <View style={{width: ITEM_SIZE}}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            transform: [{translateY}],
            borderRadius: 34,
          }}>
          <SharedElement
            id={`item.${item.key}.backdrop`}
            style={[StyleSheet.absoluteFillObject]}>
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: 'white',
                  //backgroundColor: item.color,
                  borderRadius: 34,
                  borderBottomWidth: 5,
                  borderBottomColor: item.color,
                },
              ]}
            />
          </SharedElement>

          <SharedElement id={`item.${item.key}.category`}>
            <View style={[styles.genre]}>
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

          <SharedElement
            id={`item.${item.key}.image`}
            style={styles.posterImage}>
            <Image source={{uri: item.thumbnail}} style={styles.posterImage} />
          </SharedElement>

          <SharedElement id={`item.${item.key}.meta`}>
            <View style={{alignItems: 'center', width: 200}}>
              <Text
                style={{fontSize: 14}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.title.toUpperCase()}
              </Text>
              <Text style={styles.genreText}>
                Drop date: {humanizeDate(item.date)}
              </Text>

              <View>
                <Text style={styles.price}>${item.sharePrice}</Text>
              </View>
              {/* <Rating rating={item.rating} />
                      <Genres genres={item.genres} /> */}
            </View>
          </SharedElement>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AssetCards;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  price: {
    fontSize: 17,
    paddingTop: 10,
    fontWeight: '600',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
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
