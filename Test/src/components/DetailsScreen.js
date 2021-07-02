/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Text, View} from 'react-native';

const DetailsScreen = ({navigation, route}) => {
  console.log(route);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Text>route {JSON.stringify(route)}</Text>
      <Text>navigation {JSON.stringify(navigation)}</Text>
    </View>
  );
};

export default DetailsScreen;
