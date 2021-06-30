/* eslint-disable react-native/no-inline-styles */
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
  LogBox,
  Modal,
  Pressable,
} from 'react-native';
import uuid from 'react-native-uuid';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

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
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const mockData = [
    {id: uuid.v4(), title: 'test 1'},
    {id: uuid.v4(), title: 'test 2'},
    {id: uuid.v4(), title: 'test 2'},
  ];

  const [text, setText] = useState('');
  const [todo, setTodo] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onPress = val => {
    setTodo(todo.filter(item => item.id !== val));
  };

  const onChangeText = value => {
    setText(value);
  };

  const hideModal = () => {
    setTodo([...todo, {id: uuid.v4(), title: text}]);
    setText('');
    setModalVisible(!modalVisible);
  };

  const cancel = () => {
    setModalVisible(!modalVisible);
  };

  const setToRefresh = () => {
    setRefresh(true);
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

  React.useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View>
        <View style={styles.containerSticky}>
          <View style={styles.containerRow}>
            <Pressable
              style={[styles.button, styles.buttonOpen, styles.buttonContainer]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Add to list</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.container} nestedScrollEnabled>
          <View>
            <Button
              title="Go to Details"
              onPress={() => {
                navigation.navigate('Details', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                });
              }}
            />
            <View style={styles.listHeading}>
              <Text style={styles.listHeadingText}>Todo list</Text>
            </View>
            <View style={styles.list}>
              <FlatList
                data={todo}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <View style={styles.containerRow}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="add todo"
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={hideModal}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={cancel}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'grey',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerSticky: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    height: '100%',
    paddingBottom: 200,
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
  list: {
    paddingBottom: 50,
  },
  listHeading: {
    alignItems: 'center',
  },
  listHeadingText: {
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default App;
