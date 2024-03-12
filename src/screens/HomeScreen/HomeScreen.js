import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sample from "../../../assets/favicon.png";
import { loadUserRecipe } from "../../../backend/recipesAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [recipeList, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // Call functions to fetch new data or refresh content here
      await getUserProfile(); 
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }, []);

  const getUserProfile = async () => {
    try {
      let userInfo = await AsyncStorage.getItem("userProfile");
      userInfo = JSON.parse(userInfo);
      setUserProfile(userInfo);
      const recipes = await loadUserRecipe(userInfo.user_id);
      setRecipes(recipes);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return ( // TODO: once we click friends, need to have a screen that shows all friends..?
    // TODO: if not divisible by 3 recipes, image structure is broken + cant scroll down
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: userProfile.profile_picture }} style={styles.profileImage} />
        <View style={styles.userInfoText}>
          <Text style={styles.username}>{userProfile.user_id}</Text>
          <Text style={styles.bio}>Cooking Level: {userProfile.cooking_level}</Text>
            <Text style={styles.bio}>Dietary Restrictions: {
              !userProfile.dietary_restrictions ? [] :
              (userProfile.dietary_restrictions.length == 0 ?
              "None" : userProfile.dietary_restrictions.join(', '))}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{recipeList ? recipeList.length : []}</Text>
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userProfile.friends ? userProfile.friends.length : []}</Text> 
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        {/* <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View> */}
      </View>
      <View style={styles.posts}>
        {recipeList.map((recipe, index) => (
          <Image
            key={index}
            style={styles.postImage}
            source={{ uri: recipe.recipe_picture }}
          />
        ))}
      </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoText: {
    marginLeft: 20,
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  posts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  postImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});

export default HomeScreen;
