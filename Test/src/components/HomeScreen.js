/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import uuid from 'react-native-uuid';

const HomeScreen = ({navigation}) => {
  const mockData = [
    {id: uuid.v4(), title: 'test 1'},
    {id: uuid.v4(), title: 'test 2'},
    {id: uuid.v4(), title: 'test 2'},
  ];

  const [text, setText] = useState('');
  const [todo, setTodo] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);

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
    <SafeAreaView flex={1}>
      <StatusBar barStyle="light-content" />

      {/* Add to list */}
      <View style={styles.containerSticky}>
        <View style={styles.containerRow}>
          <Pressable
            style={[styles.button, styles.buttonOpen, styles.buttonContainer]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Add todo item</Text>
          </Pressable>
        </View>
      </View>

      <View flex={1}>
        <Button
          title="Go to Details"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 0,
            });
          }}
        />
        <View style={styles.listHeading}>
          <Text style={styles.listHeadingText}>Todo list</Text>
        </View>

        <FlatList
          scrollEnabled={true}
          data={todo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
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
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    bottom: 20,
    zIndex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    paddingBottom: 220,
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
    paddingBottom: 70,
    // flex: 1,
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
