import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUserRecipe } from "../../../backend/recipesAPI";
import { getFriendsRecipes } from "../../../backend/searchAPI";
import { loadUserData } from "../../../backend/usersAPI";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const UpdateItem = ({ item, index, onPressImage }) => {
  const recipeName = item.recipe_title;
  const pic = item.recipe_picture;
  const recipeInfo = item.recipe_description;
  const userName = item.user_id;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUserData(userName); // Call the getUser function with userId
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userName]);

  const profilePic = userData.profile_picture;

  return (
    <Pressable onPress={() => onPressImage(item)}>
      <View style={styles.updateContainer}>
        <View style={styles.updateHeader}>
          {profilePic ? (
            <Image style={styles.profileImage} source={{ uri: profilePic }} />
          ) : (
            <View style={styles.defaultProfileImage} />
          )}
          <Text numberOfLines={1} style={styles.userProfile}>
            {userName}
          </Text>
        </View>
        <View style={styles.recipeImageContainer}>
          <Image style={styles.recipeImage} source={{ uri: pic }} />
        </View>
        <View style={styles.updateFooter}>
          <Text numberOfLines={1} style={styles.recipeDescription}>
            {recipeName}
          </Text>
          <Text numberOfLines={2} style={styles.recipeDescription}>
            {recipeInfo}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UpdateItem;

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
    borderColor: Themes.colors.medShade,
    borderRadius: 20,
    backgroundColor: Themes.colors.darkShade,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Half of the width and height to make it circular
    marginRight: 10,
  },
  defaultProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: Themes.colors.lightShade, // Add a default background color
  },
  updateHeader: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  userProfile: {
    fontSize: 32,
    fontWeight: "bold",
    color: Themes.colors.lightShade,
  },
  recipeImageContainer: {
    height: "70%",
    width: "100%",
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
  },
  recipeDescription: {
    fontSize: 24,
    fontWeight: "bold",
    color: "honeydew",
    marginLeft: 16
  },
});
