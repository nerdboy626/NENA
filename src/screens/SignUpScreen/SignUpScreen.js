import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Themes } from "../../../assets/Themes";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { createUserData } from "../../../backend/firebaseAPI";

const SignUpScreen = () => {
  const { username, setUsername } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { passwordRepeat, setPasswordRepeat } = useState("");
  const navigation = useNavigation();
  const onRegisterPressed = () => {
    // console.warn("Register");
    console.log("frontend username", username);
    {
      /*
    let userProfile = {
      user_id: "nico",
      password: "1111",
      email: "nico@stanford.edu",
    */
    }
    console.log("frontend username", username);
    // createUserData(userProfile);
    navigation.navigate("Welcome screen");
  };
  const onSignInPressed = () => {
    // console.warn("Sign in");
    navigation.navigate("Sign in screen");
  };
  //const {height} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fitbud}>NENA</Text>
      <View style={styles.root}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.label}>Username</Text>
        <CustomInput
          placeholder="Enter username"
          value={username}
          setValue={setUsername}
        />
        <Text style={styles.label}>Email</Text>
        <CustomInput
          placeholder="Enter email"
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
        <Text style={styles.label}>Confirm password</Text>
        <CustomInput
          placeholder="Enter password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton text="Sign up" onPress={onRegisterPressed} />
        <CustomButton
          text="Already have an account? Sign in"
          onPress={onSignInPressed}
          type="ACCOUNT"
        />
      </View>
    </SafeAreaView>
    // <View style={styles.root}>
    //   <Image source={Logo} style={styles.logo} resizeMode="contain" />
    //   <Text style={styles.title}>Create an account</Text>
    //   <CustomInput
    //     placeholder="Username"
    //     value={username}
    //     setValue={setUsername}
    //   />
    //   <CustomInput placeholder="Email" value={email} setValue={setEmail} />
    //   <CustomInput
    //     placeholder="Password"
    //     value={password}
    //     setValue={setPassword}
    //     secureTextEntry={true}
    //   />
    //   <CustomInput
    //     placeholder="Repeat password"
    //     value={passwordRepeat}
    //     setValue={setPasswordRepeat}
    //     secureTextEntry={true}
    //   />
    //   <CustomButton text="Register" onPress={onRegisterPressed} />
    //   <CustomButton
    //     text="Already have an account? Sign in"
    //     onPress={onSignInPressed}
    //     type="TERTIARY"
    //   />
    // </View>
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
    margin: 30,
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
    height: 135,
    position: "absolute",
    right: -75,
    top: 42,
  },
  rectangle: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
  },
});

export default SignUpScreen;
