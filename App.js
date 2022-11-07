import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, TouchableOpacity } from 'react-native';

const exampleListData = {
  title: "Find the rare crops",
  entries: [
    {
      id: "id001",
      content: "Find the red acorn",
      completed: true,
    },
    {
      id: "id002",
      content: "Find the orange lemon and this is a really long list item",
      completed: false,
    },
    {
      id: "id003",
      content: "Find the blue carrot and this is an even longer list item. In fact, it's comprised of multiple sentences. Here are some more words: test test test test test.",
      completed: true,
    },
    {
      id: "id004",
      content: "Find the green tomato",
      completed: false,
    },
  ]
};

const TodoItem = ({ item, index, setListData }) => {
  return <TouchableOpacity activeOpacity={.5} style={[styles.todoListRow, ...(item.completed ? [{ backgroundColor: "#ccffcc" }] : [])]}
    // TODO: replace with better setter
    onPress={e => {
      setListData(oldData => {
        oldData.entries[index].completed = !oldData.entries[index].completed;
        return { ...oldData };
      });
    }}>
    <Text style={styles.todoListText}>
      {item.content}
    </Text>
    {/* TODO: replace with icon */}
    <Checkbox
      disabled
      style={{ width: 24, height: 24 }}
      value={item.completed}
    // onValueChange={newValue => {
    //   setListData(oldData => {
    //     oldData.entries[index].completed = newValue;
    //     return { ...oldData };
    //   });
    // }} 
    />
  </TouchableOpacity>
}

export default function App() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const [listData, setListData] = useState(exampleListData);

  const page = 1;

  if (page === 0) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={`rgb(${red}, ${green}, ${blue})`} animated={true} />
        <Text>Choose your own colors!</Text>
        <View style={styles.horizontalContainer}>
          <NumberInput setVal={setRed} />
          <NumberInput setVal={setGreen} />
          <NumberInput setVal={setBlue} />
        </View>
      </View>
    );
  } else if (page === 1) {
    return (
      <View style={[styles.container, { width: "100%" }]}>
        <StatusBar style="dark" backgroundColor={`rgb(${red}, ${green}, ${blue})`} animated={true} />
        {/* TODO: replace with always using SectionList */}
        <FlatList
          data={listData.entries}
          renderItem={({ item, index }) => <TodoItem item={item} index={index} setListData={setListData} />}
        />
      </View>
    )
  }
}

const NumberInput = ({ setVal = () => { } }) => {
  const [value, setValue] = useState("0");

  return <TextInput
    value={value}
    keyboardType='number-pad'
    style={styles.numberInput}
    onChangeText={setValue}
    onEndEditing={(e) => {
      const inputNumber = e?.nativeEvent?.text;
      const boundedInput = isNaN(inputNumber) ? 0 : boundNumber(inputNumber, 0, 255);
      setVal(boundedInput);
      setValue(boundedInput.toString());
    }}
  />
}

const boundNumber = (num, min, max) =>
  Math.max(Math.min(num, max), min);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  horizontalContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  todoListRow: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    minWidth: "100%",
    paddingHorizontal: 10
  },
  todoListText: {
    fontSize: 24,
    flex: 1
  },
  numberInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 50,
  }
});
