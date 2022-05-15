import * as React from 'react';
//import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import {View} from 'react-native-animatable';
import {fonts} from '../config/theme';
import {Text, TouchableOpacity} from 'react-native';

export default function GoBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 2,
      }}
      onPress={() => {
        // animation(0).start()
        navigation.goBack();
      }}>
      <Text>{' << '}</Text>
      <Text style={{fontSize: 12}}>LIST</Text>
    </TouchableOpacity>
  );
}
