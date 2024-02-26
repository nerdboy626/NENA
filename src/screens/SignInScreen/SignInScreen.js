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

const SignInScreen = () => {
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState("");
  const navigation = useNavigation();
  const onSignInPressed = () => {
    // console.warn("Sign in");
    navigation.navigate("Home screen");
  };
  const onForgotPasswordPressed = () => {
    console.warn("Forgot password");
  };
  const onSignUpPressed = () => {
    // console.warn("Sign up");
    navigation.navigate("Sign up screen");
  };
  const Rectangle = () => {
    return <View style={styles.rectangle} />;
  };
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fitbud}>NENA</Text>
      <View style={styles.root}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.label}>Username or email</Text>
        <CustomInput
          placeholder="Enter username or email"
          value={username}
          setValue={setUsername}
        />
        <Text style={styles.label}>Password</Text>
        <CustomInput
          placeholder="Enter password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton text="Sign in" onPress={onSignInPressed} />
        <CustomButton
          text="Don't have an account? Sign up"
          onPress={onSignUpPressed}
          type="ACCOUNT"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5236",
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
