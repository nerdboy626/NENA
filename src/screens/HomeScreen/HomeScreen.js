import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "../../../assets/Themes";

const FirstScreen = () => {
  const { username, setUsername } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { passwordRepeat, setPasswordRepeat } = useState("");
  const navigation = useNavigation();
  const onGetStartedPressed = () => {
    // console.warn("Get started");
    // navigation.navigate("Sign in screen");
    console.log("hi");
  };
  //const {height} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fitbud}>home screen</Text>
      {/* <Image source={Logo1} style={styles.logo1} resizeMode="contain" />
      <Image source={Logo2} style={styles.logo2} resizeMode="contain" /> */}
      <View style={styles.buttons}>
        <CustomButton
          text="hi"
          onPress={onGetStartedPressed}
          type="SECONDARY"
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
    justifyContent: "center",
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
    verticalAlign: "center",
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
  },
  label: {
    fontSize: 24,
    color: "black",
    textAlign: "left",
    margin: 2,
  },
  logo1: {
    width: "100%",
    height: 500,
    position: "absolute",
    left: -120,
    bottom: -100,
  },
  logo2: {
    width: "100%",
    height: 500,
    position: "absolute",
    right: -225,
    top: 20,
    transform: [{ rotateZ: "-30deg" }],
  },
  rectangle: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
  },
});

export default FirstScreen;
