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
  ScrollView,
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
      const recipes = await getFriendsRecipes(userInfo.user_id);
      setRecipes(recipes);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);


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

  console.log(contentDisplayed)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {contentDisplayed}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: Themes.colors.darkShade,
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
