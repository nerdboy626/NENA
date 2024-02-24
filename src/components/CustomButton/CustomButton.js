import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}> {text} </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    // height: "10%",
    // verticalAlign: "center",
    // borderColor: "e8e8e8",
    // borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 40,
    alignItems: "center",
  },
  container_PRIMARY: {
    backgroundColor: "#324e80",
  },
  container_SECONDARY: {
    backgroundColor: "white",
  },
  container_TERTIARY: {
    alignItems: "left",
    padding: 0,
  },
  container_ACCOUNT: {
    alignItems: "center",
    padding: 0,
  },
  container_SELECT1: {
    backgroundColor: "#324e80",
    width: "30%",
    position: "absolute",
    left: 40,
    bottom: 315,
  },
  container_SELECT2: {
    backgroundColor: "#324e80",
    width: "30%",
    position: "absolute",
    right: 40,
    bottom: 315,
  },
  container_SELECT3: {
    backgroundColor: "#324e80",
    width: "30%",
    alignSelf: "center",
    position: "absolute",
    bottom: 40,
  },
  container_EDITWORKOUT: {
    backgroundColor: "#324e80",
    width: "35%",
    alignSelf: "flex-end",
    margin: 2,
    marginRight: 10,
  },
  container_START: {
    backgroundColor: "#324e80",
    width: "40%",
    position: "absolute",
    right: 25,
    bottom: 0,
  },
  container_FINISH: {
    backgroundColor: "#324e80",
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  container_CANCEL: {
    backgroundColor: "#FF5236",
    width: "40%",
    position: "absolute",
    left: 25,
    bottom: 0,
  },
  container_STARTWORKOUT: {
    backgroundColor: "#324e80",
    width: "45%",
    alignSelf: "center",
    margin: 2,
  },
  container_BACK: {
    backgroundColor: "#FF5236",
    width: "45%",
    alignSelf: "center",
    margin: 2,
  },
  container_CONFIRM: {
    backgroundColor: "#324e80",
    width: "30%",
    alignSelf: "center",
    position: "absolute",
    bottom: 40,
  },
  container_DISABLED: {
    backgroundColor: "#324e80",
    width: "95%",
    alignSelf: "center",
    padding: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  container_HP: {
    backgroundColor: "#FF5236",
    width: "95%",
    alignSelf: "center",
    padding: 18,
    marginTop: 0,
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  text_SECONDARY: {
    color: "black",
  },
  text_TERTIARY: {
    color: "gray",
    fontSize: 14,
  },
  text_ACCOUNT: {
    color: "gray",
    fontSize: 14,
  },
  text_DISABLED: {
    fontSize: 24,
  },
});

export default CustomButton;
