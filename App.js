import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';

export default function App() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  numberInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 50,
  }
});
