import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  type = "PRIMARY",
}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)} // This allows text to be stored in variable
        placeholder={placeholder}
        style={[styles.input, styles[`input_${type}`]]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 25,
    verticalAlign: "middle",
    borderColor: "e8e8e8",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingBottom: 5,
    paddingHorizontal: 2,
    marginTop: 20,
    marginBottom: 40,
  },
  container_SECONDARY: {
    backgroundColor: "#e1e9f7",
    width: "50%",
    height: 50,
    borderBottomWidth: 0,
    borderRadius: 12,
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
    justifyContent: "center",
  },
  input: {
    verticalAlign: "middle",
    fontSize: 20,
  },
  input_SECONDARY: {
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: 24,
  },
});

export default CustomInput;
