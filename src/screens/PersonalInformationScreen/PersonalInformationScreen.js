import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "../../../assets/Themes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ birthday, setBirthday ] = useState("");
  const navigation = useNavigation();
  const onSignInPressed = () => {
    // console.warn("Sign in");
    navigation.navigate("Home");
  };
  const onNextPressed = async () => {
    // console.warn("Next");
    try {
      let userProfile = await AsyncStorage.getItem('userProfile');
      userProfile = JSON.parse(userProfile);
      userProfile = { // Addings fields newly populated in this file
        ...userProfile,
        'first_name': firstName,
        'last_name': lastName,
        'DOB': birthday,
      }
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      navigation.navigate("Getting started screen");
    } catch (e) {
      console.error(e);
    }
  };
  const Rectangle = () => {
    return <View style={styles.rectangle} />;
  };
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fitbud}>NENA</Text>
      <View style={styles.root}>
        <Text style={styles.title}>Personal information</Text>
        <Text style={styles.label}>First name</Text>
        <CustomInput
          value={firstName}
          setValue={setFirstName}
          placeholder="Enter first name"
        />
        <Text style={styles.label}>Last name</Text>
        <CustomInput
          value={lastName}
          setValue={setLastName}
          placeholder="Enter last name"
        />
        <Text style={styles.label}>Date of birth</Text>
        <CustomInput
          value={birthday}
          setValue={setBirthday}
          placeholder="Enter birthday (MM/DD/YYYY)"
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton text="Next" onPress={onNextPressed} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.background,
  },
  root: {
    //alignItems: "center",
    padding: 45,
    paddingBottom: 10,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  buttons: {
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: "white",
  },
  fitbud: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    margin: 75,
    marginTop: 80,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    color: "black",
    textAlign: "left",
    margin: 2,
    marginBottom: 40,
    fontWeight: "bold",
  },
  label: {
    fontSize: 24,
    color: "black",
    textAlign: "left",
    margin: 2,
  },
  logo: {
    width: "70%",
    height: 150,
    position: "absolute",
    right: -75,
    top: 123,
  },
  rectangle: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
  },
});

export default SignInScreen;
