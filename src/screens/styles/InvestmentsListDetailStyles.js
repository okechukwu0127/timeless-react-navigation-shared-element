import * as React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {height, width, fonts, IMAGES} from '../../config/theme';

const BACKDROP_HEIGHT = height * 0.75;

const ITEM_WIDTH = width * 0.68;
const SPACING = 20;
const TOP_HEADER_HEIGHT = height * 0.3;

const styles = StyleSheet.create({
  headerMain: {flexDirection: 'row', justifyContent: 'space-between'},
  LinearG: {
    height: BACKDROP_HEIGHT / 2,
    width,
    position: 'absolute',
    top: 0,
  },
  h20: {
    height: 20,
  },
  price: {
    fontSize: 16,
  },
  getStarted: {
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
  },
  getStartedText: {alignSelf: 'center', color: 'white', fontWeight: '600'},

  topContainer: {
    position: 'absolute',
    flexWrap: 'nowrap',
    top: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3d66b1',
  },
  content: {fontSize: 13, lineHeight: 20},
  details: {
    color: 'grey',
    fontSize: 18,
    marginBottom: SPACING,
    marginTop: SPACING - 30,
  },
  inActiveTab: {color: '#3d66b1', fontWeight: '300'},
  inactivTab: {color: 'grey', fontSize: 12},
  scrollViewD: {
    fontSize: 18,
    marginTop: 40,
    color: 'grey',
    marginBottom: SPACING,
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'space-around',
    backgroundColor: '#f2f6fa8c',
  },
  font18: {
    fontSize: 18,
  },
  buttonDColor: {color: '#3d66b1', fontWeight: '500'},
  buttonD: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: '#3d66b1',
    padding: 10,
    borderRadius: 5,
  },

  headerRight: {
    width: 35,
    height: 35,
    borderColor: '#ccc',
    borderRadius: 17,
    top: SPACING - (Platform.OS == 'ios' ? 40 : 10),
    left: SPACING - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {width: 20, height: 20},
  headerIcon2: {width: 30, height: 30},
  headerLeft: {
    width: 40,
    height: 40,

    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 17,
    top: SPACING - (Platform.OS == 'ios' ? 40 : 10),
    left: SPACING - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    position: 'absolute',
    borderRadius: 10,
    right: 0,
    width: 20,
    height: 20,
  },
  category: {
    width: 'auto',
    marginBottom: 10,
    alignSelf: 'center',
  },
  containerTwo: {top: TOP_HEADER_HEIGHT, padding: SPACING},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 34,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  flex1: {flex: 1},
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

export default styles;
