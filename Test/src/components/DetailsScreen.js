/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import uuid from 'react-native-uuid';

const DetailsScreen = ({navigation, route}) => {
  const mockData = [
    {id: uuid.v4(), title: 'test 1'},
    {id: uuid.v4(), title: 'test 2'},
    {id: uuid.v4(), title: 'test 3'},
  ];

  const defaultId = route.params.itemId || 0;
  const [id, setId] = useState(defaultId);

  const findItem = mockData[defaultId] || {};

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go back to HOME" onPress={() => navigation.popToTop()} />
      <Button
        title="Go to Details... again"
        onPress={() => {
          setId(defaultId + 1);
          navigation.push('Details', {
            itemId: defaultId + 1,
          });
        }}
      />
      <View>
        <Text>id: {id}</Text>
      </View>
      <View>
        <Text>route: {JSON.stringify(route)}</Text>
      </View>
      <View>
        <Text>navigation: {JSON.stringify(navigation)}</Text>
      </View>
      <View>
        <Text>findItem: {JSON.stringify(findItem)}</Text>
      </View>
    </View>
  );
};

export default DetailsScreen;
