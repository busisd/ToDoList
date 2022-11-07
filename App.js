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
      <NumberInput setVal={setRed} />
      <NumberInput setVal={setGreen} />
      <NumberInput setVal={setBlue} />
    </View>
  );
}

const NumberInput = ({ setVal = () => { } }) => (
  <TextInput
    defaultValue='0'
    keyboardType='number-pad'
    style={styles.numberInput}
    onEndEditing={(e) => {
      const num = e?.nativeEvent?.text;
      setVal(isNaN(num) ? 0 : boundNumber(num, 0, 255));
    }}
  />
)

const boundNumber = (num, min, max) =>
  Math.max(Math.min(num, max), min);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  numberInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 50,
  }
});
