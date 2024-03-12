import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "../../../assets/Themes";
import { createUserData } from "../../../backend/usersAPI";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const GettingStartedScreen = () => {
  const [q1, setq1] = useState("");
  const [q2, setq2] = useState("");
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const restrictions = [
    "Vegan",
    "Vegetarian",
    "Kosher",
    "Nut-free",
    "Gluten-free",
  ];
  const locations = ["Gym", "Home", "Outside"];
  const durations = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "60 minutes",
    ">1 hour",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const times = ["Morning", "Afternoon", "Evening"];
  const [userImage, setUserImage] = useState(null);
  const [expertise, setExpertise] = React.useState("");
  const [diet, setDiet] = React.useState("");
  const navigation = useNavigation();

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
    setUserImage(pickerResult.assets[0].uri); // this is where you set the "imageUri" variable. Everything still on the frontend
  };

  const onSubmit = async () => {
    try {
      let userProfile = await AsyncStorage.getItem("userProfile");
      userProfile = JSON.parse(userProfile);
      console.log("expertise: ", expertise);
      console.log('diet', diet);
      userProfile = {
        ...userProfile,
        'profile_picture': userImage, // TODO: need to have dummy profile when image is not selected
        'cooking_level': expertise,
        'dietary_restrictions': diet,
      }
      const updatedUserProfile = await createUserData(userProfile);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
      navigation.navigate("Home screen");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
      <ScrollView>
        <Text style={styles.fitbud}>NENA</Text>
        <View style={styles.root}>
          <Text style={styles.title}>Getting Started</Text>
          <Text style={styles.label}>
            Select your profile picture
          </Text>
          <TouchableOpacity
            style={styles.imagePreview}
            onPress={pickImage}
          >
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.image} />
            ) : (
              <Text style={styles.previewText}>Tap to select an image</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.label}>
            What is your level of cooking expertise?
          </Text>
          <SelectList
            setSelected={setExpertise}
            data={levels}
            label="Selected"
            boxStyles={styles.dropdown} //override default styles
            dropdownStyles={styles.dropdownBox}
            placeholder={"Select best option"}
          />
          <Text style={styles.label}>What are your dietary restrictions?</Text>
          <MultipleSelectList
            setSelected={(val) => setDiet(val)}
            data={restrictions}
            save="value"
            label="Selected"
            boxStyles={styles.dropdown} //override default styles
            dropdownStyles={styles.dropdownBox}
            badgeStyles={styles.badge}
            placeholder={"Select all that apply"}
          />
        </View>
        <View style={styles.buttons}>
          <CustomButton text="Submit" onPress={onSubmit} />
        </View>
      </ScrollView>
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
    fontSize: 18,
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
  dropdown: {
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 12,
  },
  dropdownBox: {
    marginTop: -15,
    marginBottom: 25,
  },
  badge: {
    backgroundColor: "#324e80",
  },
  checkbox: {
    backgroundColor: "#324e80",
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "69%",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default GettingStartedScreen;





// return (
//     <ScrollView>
//       <SafeAreaView style={styles.container} forceInset={{ bottom: "always" }}>
//         <Text style={styles.fitbud}>NENA</Text>
//         <View style={styles.root}>
//           <Text style={styles.title}>Getting Started</Text>
//           <Text style={styles.label}>
//             What is your level of cooking expertise?
//           </Text>
//           <SelectList
//             // onSelect={() => alert(selected)}
//             setSelected={setSelected}
//             data={levels}
//             label="Selected"
//             // search={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             placeholder={"Select best option"}
//           />
//           <Text style={styles.label}>What are your dietary restrictions?</Text>
//           <MultipleSelectList
//             setSelected={(val) => setSelected(val)}
//             data={restrictions}
//             save="value"
//             // onSelect={() => alert(selected)}
//             label="Selected"
//             //search={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             badgeStyles={styles.badge}
//             placeholder={"Select all that apply"}
//           />
//           {/* <Text style={styles.label}>Where do you want to work out?</Text>
//           <MultipleSelectList
//             setSelected={(val) => setSelected(val)}
//             data={locations}
//             save="value"
//             // onSelect={() => alert(selected)}
//             label="Selected"
//             // search={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             badgeStyles={styles.badge}
//             placeholder={"Select all that apply"}
//           />
//           <Text style={styles.label}>
//             How long do you want to work out for?
//           </Text>
//           <SelectList
//             // onSelect={() => alert(selected)}
//             setSelected={setSelected}
//             data={durations}
//             // search={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             placeholder={"Select best option"}
//           />
//           <Text style={styles.label}>
//             On which day(s) do you prefer to work out?
//           </Text>
//           <MultipleSelectList
//             setSelected={(val) => setSelected(val)}
//             data={days}
//             save="value"
//             // onSelect={() => alert(selected)}
//             label="Selected"
//             // search={false}
//             //placeholder="what"
//             dropdownShown={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             badgeStyles={styles.badge}
//             placeholder={"Select all that apply"}
//           />
//           <Text style={styles.label}>
//             During which time(s) of day do you prefer to work out?
//           </Text>
//           <MultipleSelectList
//             setSelected={(val) => setSelected(val)}
//             data={times}
//             save="value"
//             // onSelect={() => alert(selected)}
//             label="Selected"
//             // search={false}
//             boxStyles={styles.dropdown} //override default styles
//             dropdownStyles={styles.dropdownBox}
//             badgeStyles={styles.badge}
//             placeholder={"Select all that apply"}
//           /> */}
//         </View>
//         <View style={styles.buttons}>
//           <CustomButton text="Submit" onPress={onSubmit} />
//         </View>
//       </SafeAreaView>
//       {/* <SafeAreaView style={styles.root}>
//         <Text style={styles.title}>Getting started</Text>
//         <Text>What is your current fitness level?</Text>
//         <SelectList
//           // onSelect={() => alert(selected)}
//           setSelected={setSelected}
//           fontFamily="lato"
//           data={levels}
//           label="Selected"
//           // search={false}
//           //boxStyles={{ borderRadius: 0 }} //override default styles
//           //defaultOption={{ key: "1", value: "Jammu & Kashmir" }} //default selected option
//         />
//         <Text>What are your fitness goals?</Text>
//         <MultipleSelectList
//           setSelected={(val) => setSelected(val)}
//           data={goals}
//           save="value"
//           // onSelect={() => alert(selected)}
//           label="Selected"
//           //search={false}
//         />
//         <Text>Where do you want to work out?</Text>
//         <MultipleSelectList
//           setSelected={(val) => setSelected(val)}
//           data={locations}
//           save="value"
//           // onSelect={() => alert(selected)}
//           label="Selected"
//           // search={false}
//         />
//         <Text>How long do you want to work out for?</Text>
//         <SelectList
//           // onSelect={() => alert(selected)}
//           setSelected={setSelected}
//           fontFamily="lato"
//           data={durations}
//           // search={false}
//           boxStyles={{ borderRadius: 0 }} //override default styles
//           //defaultOption={{ key: "1", value: "Jammu & Kashmir" }} //default selected option
//         />
//         <Text>On which days would you prefer to work out?</Text>
//         <MultipleSelectList
//           setSelected={(val) => setSelected(val)}
//           data={days}
//           save="value"
//           // onSelect={() => alert(selected)}
//           label="Selected"
//           // search={false}
//           //placeholder="what"
//           dropdownShown={false}
//         />
//         <Text>During what time of day would you prefer to work out?</Text>
//         <MultipleSelectList
//           setSelected={(val) => setSelected(val)}
//           data={times}
//           save="value"
//           // onSelect={() => alert(selected)}
//           label="Selected"
//           // search={false}
//         />
//         <CustomButton text="Submit" onPress={onSubmit} />
//   </SafeAreaView> */}
//     </ScrollView>
//   );
// };