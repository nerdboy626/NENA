import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFriendsRecipes } from "../../../backend/searchAPI";
import UpdateItem from "./UpdateView";
import TryAgain from "./TryAgain";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const [username, setUsername] = useState(""); // should be [ ] and not { }
  const [email, setEmail] = useState("");
  const [recipeList, setRecipes] = useState([]);
  //let recipeList = [];

  const getRecipes = async () => {
    try {
      let userInfo = await AsyncStorage.getItem("userProfile");
      userInfo = JSON.parse(userInfo);
      console.log("hi");
      //console.log("user_info", userInfo);
      //setUsername("heloooo");
      //let userName = "heloooooo";
      console.log(userInfo.user_id);
      console.log(userInfo);
      console.log("hey");
      //console.log(userName);
      //console.log("hey");
      const recipes = await getFriendsRecipes(userInfo.user_id);
      // TODO (by alex): fyi its most likely going to throw an error because of your console.log statemetns.
      // when user's friends have no recipes, recipes list will be empty. console.log(recipeList[0]) will thus throw error
      setRecipes(recipes);
      console.log(recipeList);
      console.log("ahhhhh");
      console.log(recipeList[0]);
      console.log(recipeList[0].recipe_title);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  //getRecipes();

  let contentDisplayed = null;

  if (recipeList !== null) {
    contentDisplayed = (
      <FlatList
        data={recipeList}
        renderItem={({ item, index }) => (
          <UpdateItem item={item} index={index} />
        )}
      />
    );
  } else {
    contentDisplayed = <TryAgain />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{contentDisplayed}</View>
    </SafeAreaView>
  );
  /*
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.updateContainer}>
        <View style={styles.updateHeader}>
          <Ionicons
            name="person-circle-outline"
            size={60}
            color={Themes.colors.darkShade}
          />
          <Text numberOfLines={1} style={styles.userProfile}>
            {recipeList.length > 0 ? recipeList[0].user_id : "Loading..."}
          </Text>
        </View>
        <View style={styles.recipeImageContainer}>
          <Image
            style={styles.recipeImage}
            source={
              recipeList.length > 0
                ? { uri: recipeList[0].recipe_picture }
                : require("../../../assets/favicon.png")
            }

            //{require("../../../assets/favicon.png")}
          />
        </View>
        <View style={styles.updateFooter}>
          <Text numberOfLines={1} style={styles.recipeDescription}>
            {recipeList.length > 0 ? recipeList[0].recipe_title : "Loading..."}
          </Text>
          <Text numberOfLines={1} style={styles.recipeDescription}>
            This is where the recipe rating would go
          </Text>
          <Text numberOfLines={2} style={styles.recipeDescription}>
            {recipeList.length > 0
              ? recipeList[0].recipe_description
              : "Loading..."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: Themes.colors.background,
  },
  updateContainer: {
    alignItems: "center",
    height: windowHeight * 0.7,
    width: "100%",
    marginBottom: 15,
    borderWidth: 5,
    borderColor: Themes.colors.lightShade,
    borderRadius: 20,
    backgroundColor: Themes.colors.boxBackground,
  },
  updateHeader: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    borderColor: "blue",
    borderWidth: 1,
    alignItems: "center",
  },
  userProfile: {
    fontSize: 32,
    fontWeight: "bold",
    color: Themes.colors.darkShade,
  },
  recipeImageContainer: {
    height: "70%",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
  recipeImage: {
    height: "100%",
    width: "100%",
    //borderTopLeftRadius: 15,
    //borderBottomLeftRadius: 15,
  },
  updateFooter: {
    height: "20%",
    width: "100%",
    justifyContent: "space-around",
    borderColor: "purple",
    borderWidth: 2,
  },
  recipeDescription: {
    fontSize: 24,
    fontWeight: "bold",
    color: Themes.colors.darkShade,
  },
  content: {
    height: "100%",
    width: "100%",
  },
});
