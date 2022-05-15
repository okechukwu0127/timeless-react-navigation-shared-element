import React from 'react';
import {Easing, StyleSheet} from 'react-native';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';

import InvestmentsList from './src/screens/InvestmentsList';

import InvestmentsListDetails from './src/screens/InvestmentsListDetails';

const Stack = createSharedElementStackNavigator();
const App = () => {
  const options = {
    gestureEnabled: false,
    headerBackTitleVisible: false,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {duration: 400, easing: Easing.inOut(Easing.ease)},
      },
      close: {
        animation: 'timing',
        config: {duration: 400, easing: Easing.inOut(Easing.ease)},
      },
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="InvestmentsList">
        <Stack.Screen
          name="InvestmentsList"
          options={options}
          component={InvestmentsList}
        />

        <Stack.Screen
          name="InvestmentsListDetails"
          options={options}
          component={InvestmentsListDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
