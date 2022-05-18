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
 const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
import {width, height} from '../config/theme';



const AssetCards = ({
  navigation,
  item,
  investments,
  index,
  scrollX,
  numFormater,
}) => {
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
      onPress={() => {
        navigation.navigate('InvestmentsListDetails', {
          item,
          humanizeDate,
          numFormater,
          prevImage: investments[index - 1]?.images.thumbnailFlatten,
          nextImage: investments[index + 1]?.images.thumbnailFlatten,
        });
      }}>
      <View style={styles.itemWidth}>
        <Animated.View
          style={[
            styles.itemData,
            {
              transform: [{translateY}],
            },
          ]}>
          <SharedElement
            id={`item.${item.key}.backdrop`}
            style={[StyleSheet.absoluteFillObject]}>
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                styles.itemBackdrop,
                {
                  borderBottomColor: item.color,
                },
              ]}
            />
          </SharedElement>

          <SharedElement id={`item.${item.key}.category`}>
            <View style={[styles.genre]}>
              <Text style={[styles.genreText, styles.padR18]}>
                {item.category.replace(/_/g, ' ')}
              </Text>

              <View
                style={[
                  styles.category,
                  {backgroundColor: item.status === 'open' ? 'green' : 'red'},
                ]}>
                <Text style={styles.h20}></Text>
              </View>
            </View>
          </SharedElement>

          <SharedElement
            id={`item.${item.key}.image`}
            style={styles.posterImage}>
            <Image source={{uri: item.thumbnail}} style={styles.posterImage} />
          </SharedElement>

          <SharedElement id={`item.${item.key}.meta`}>
            <View style={styles.meta}>
              <Text style={styles.ft14} numberOfLines={1} ellipsizeMode="tail">
                {item.title.toUpperCase()}
              </Text>
              <Text style={styles.genreText}>
                Drop date: {humanizeDate(item.date)}
              </Text>

              <View>
                <Text style={styles.price}>{numFormater(item.sharePrice)}</Text>
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

export default React.memo(AssetCards);

const styles = StyleSheet.create({
  ft14: {fontSize: 14},
  meta: {alignItems: 'center', width: 200},
  h20: {height: 20},
  category: {
    position: 'absolute',
    borderRadius: 10,
    right: 0,
    width: 20,
    height: 20,
  },
  itemData: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    borderRadius: 34,
  },
  padR18: {
    paddingRight: 18,
  },
  itemBackdrop: {
    backgroundColor: 'white',
    borderRadius: 34,
    borderBottomWidth: Platform.OS === 'ios' ? 5 : 0,
  },
  itemWidth: {
    width: ITEM_SIZE,
  },
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
    height: Platform.OS === 'ios' ? ITEM_SIZE * 1.2 : ITEM_SIZE * 0.8, //ITEM_SIZE * 1.2,
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
