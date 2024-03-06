import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "../../../assets/Themes";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import { createUserData } from "../../../backend/usersAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {
  const navigation = useNavigation();
  // IMAGE COMPONENTS
  const [imageUri, setImageUri] = useState(null);

  // Handler for storing image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    // For web, the URI is directly usable
    setImageUri(pickerResult.assets[0].uri); // this is where you set the "imageUri" variable. Everything still on the frontend
  };

  const onGetStartedPressed = async () => {
    try {
      let userProfile = { // Dummy userProfile. This should obviously be maintained with specific components
        'user_id': 'alexpaek',
        'profile_picture': imageUri,
      }
      const updatedUserProfile = await createUserData(userProfile); // This is essential. "imageUri" in the backend gets converted to a firebase URL. 
                                                                    // That updated information is returned in createUserData
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile)); // AsyncStorage, talked about in meeting
      navigation.navigate("Sign in screen");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton
          text="Get started"
          onPress={onGetStartedPressed}
          type="SECONDARY"
        />
      </View>
      <View>
        <Button title="Pick Image" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5236",
    justifyContent: "center",
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
