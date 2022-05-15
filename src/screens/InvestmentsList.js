/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {getInvestments} from '../config/data/timeless';


import {width} from '../config/theme';
import AssetCards from '../components/AssetCards';
import Backdrop from '../components/Backdrop';


;

export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);


export default function InvestmentsList({navigation,item}) {
  const [investments, setInvestments] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const backdropAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fetchData = async () => {
      //console.log('sdsdsd')
      const investments = await getInvestments();
      setInvestments(investments.slice(0, 12));
    };

    if (investments.length === 0) {
      fetchData(investments);
    }
  }, []);

  if (investments.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      

      <Backdrop investments={investments} scrollX={backdropAnimated} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={investments}
        keyExtractor={item => String(item.key)}
        horizontal
        bounces={false}
        decelerationRate={'fast'}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: EMPTY_ITEM_SIZE,
          
        }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
            listener: event => {
              backdropAnimated.setValue(event.nativeEvent.contentOffset.x);
            },
          },
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <AssetCards
              navigation={navigation}
              item={item}
              scrollX={scrollX}
              investments={investments}
              index={index}
            />
          );
        }}
      />
      <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
        <TouchableOpacity>
          <Image
            source={require('./../assets/filter.png')}
            style={{width: 40, height: 40, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3d66b1',
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
});
