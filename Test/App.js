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
} from 'react-native';

const App = () => {
  const mockData = [
    {id: 1, title: 'test 1'},
    {id: 2, title: 'test 2'},
    {id: 3, title: 'test 2'},
  ];

  const [text, setText] = useState('');
  const [todo, setTodo] = useState(mockData);
  const onPressLearnMore = () => {
    setTodo([...todo, {id: todo.length + 1, title: text}]);
    setText('');
  };

  const onChangeText = value => {
    setText(value);
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerStyle}>
        <Text>Todo list</Text>
        <View style={styles.containerRow}>
          <FlatList
            data={todo}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.containerRow}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.containerRow}>
          <Text>
            <Button title="Add" onPress={onPressLearnMore} />
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
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
  },
  title: {
    fontSize: 32,
  },
});

export default App;
