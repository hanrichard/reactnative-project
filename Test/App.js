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

const App = () => {
  const mockData = [
    {id: uuid.v4(), title: 'test 1'},
    {id: uuid.v4(), title: 'test 2'},
    {id: uuid.v4(), title: 'test 2'},
  ];

  const [text, setText] = useState('');
  const [todo, setTodo] = useState(mockData);
  const onPressLearnMore = () => {
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
          <Text>Todo list</Text>
          <View style={styles.containerRow}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="add todo"
            />
          </View>
          <View style={styles.containerRow}>
            <Button title="Add" onPress={onPressLearnMore} />
          </View>
        </View>

        <ScrollView style={styles.container}>
          <View>
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

const styles = StyleSheet.create({
  containerSticky: {
    position: 'absolute',
    top: 1,
    zIndex: 1,
    backgroundColor: '#fff',
    height: 40,
  },
  container: {
    height: '100%',
    paddingTop: 70,
  },
  list: {
    marginBottom: 60,
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
    marginTop: 32,
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
