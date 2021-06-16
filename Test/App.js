import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeScreen = ({navigation}) => {
  const mockData = [
    {id: uuid.v4(), title: 'test 1'},
    {id: uuid.v4(), title: 'test 2'},
    {id: uuid.v4(), title: 'test 2'},
  ];

  const [text, setText] = useState('');
  const [todo, setTodo] = useState(mockData);

  const onPressToDelete = () => {
    setTodo([...todo, {id: uuid.v4(), title: text}]);
    setText('');
  };

  const onPress = val => {
    setTodo(todo.filter(item => item.id !== val));
  };

  const onChangeText = value => {
    setText(value);
  };

  const Item = ({title, id}) => (
    <View style={styles.item}>
      <Text style={styles.titleStyle}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPress(id)}>
        <Text>Press Here to close</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} id={item.id} />;

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View>
        <View style={styles.containerSticky}>
          <View style={styles.containerRow}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="add todo"
            />
          </View>
          <View style={styles.containerRow}>
            <Button title="Add" onPress={onPressToDelete} />
          </View>
        </View>

        <ScrollView style={styles.container}>
          <View>
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
            />
            <Text>Todo list</Text>
            <View style={styles.list}>
              <FlatList
                data={todo}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerSticky: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    height: '100%',
  },
  button: {
    width: 'auto',
  },
  titleStyle: {
    marginRight: 'auto',
  },
  containerStyle: {
    height: '100%',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    display: 'flex',
  },
  title: {
    fontSize: 32,
  },
});

export default App;
