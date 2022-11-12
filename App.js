import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const exampleSectionListData = [
  {
    title: "Find the rare crops",
    data: [
      {
        content: "Find the red acorn",
        completed: false,
      },
      {
        content: "Find the orange lemon and this is a really long list item",
        completed: false,
      },
      {
        content: "Find the blue carrot and this is an even longer list item. In fact, it's comprised of multiple sentences. Here are some more words: test test test test test.",
        completed: false,
      },
      {
        content: "Find the green tomato",
        completed: false,
      },
    ],
    index: 0,
    showSection: true
  },
  {
    title: "Find the lucky charms",
    data: [
      {
        content: "Horseshoe",
        completed: false
      },
      {
        content: "Pot of gold",
        completed: false,
      },
      {
        content: "Clover",
        completed: false,
      },
      {
        content: "Magic hat",
        completed: false,
      },
    ],
    index: 1,
    showSection: true
  }
];

const TodoItem = ({ item, index, onPress, show }) => {
  if (!show) return null;
  return <TouchableOpacity activeOpacity={.5} style={[styles.todoListRow, ...(item.completed ? [{ backgroundColor: "#ccffcc" }] : [])]}
    onPress={onPress}>
    <Text style={styles.todoListText}>
      {item.content}
    </Text>
    {/* TODO: replace with icon */}
    <Checkbox
      disabled
      style={{ width: 24, height: 24 }}
      value={item.completed}
    />
  </TouchableOpacity>
}

export default function App() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const [sectionListData, setSectionListData] = useState(exampleSectionListData);

  const page = 1;

  if (page === 0) {
    return (
      <SafeAreaView View style={styles.container}>
        <StatusBar style="dark" backgroundColor={`rgb(${red}, ${green}, ${blue})`} animated={true} />
        <Text>Choose your own colors!</Text>
        <View style={styles.horizontalContainer}>
          <NumberInput setVal={setRed} />
          <NumberInput setVal={setGreen} />
          <NumberInput setVal={setBlue} />
        </View>
      </SafeAreaView>
    );
  } else if (page === 1) {
    return (
      <SafeAreaView style={[styles.container, { width: "100%" }]}>
        <StatusBar style="dark" backgroundColor={`rgb(${red}, ${green}, ${blue})`} animated={true} />
        <SectionList
          sections={sectionListData}
          renderItem={({ item, index, section }) => <TodoItem item={item} index={index} show={section.showSection} onPress={() => setSectionListData(oldData => {
            oldData[section.index].data[index].completed = !oldData[section.index].data[index].completed;
            return [...oldData];
          })} />}
          renderSectionHeader={({ section }) => (
            <TouchableOpacity activeOpacity={.5} onPress={() => setSectionListData(oldData => {
              oldData[section.index].showSection = !oldData[section.index].showSection;
              return [...oldData];
            })}
              style={[styles.todoListHeaderRow, { minWidth: "100%", paddingVertical: 4 }, ...section.data.every(item => item.completed) ? [{ backgroundColor: "#ccffcc" }] : []]}
            >
              <Text style={styles.todoListHeaderText}>{section.title}</Text>
              <AntDesign name={section.showSection ? "minuscircleo" : "pluscircleo"} size={24} color="black" />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  horizontalContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  todoListHeaderRow: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    minWidth: "100%",
    paddingHorizontal: 5
  },
  todoListRow: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    minWidth: "100%",
    paddingHorizontal: 10
  },
  todoListHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1
  },
  todoListText: {
    fontSize: 20,
    flex: 1
  },
  numberInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 50,
  }
});
