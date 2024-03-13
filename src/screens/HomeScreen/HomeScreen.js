import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sample from "../../../assets/favicon.png";
import { Themes } from "../../../assets/Themes";
import { loadUserRecipe } from "../../../backend/recipesAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Stack2 = createStackNavigator();

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container2}>
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{recipe.recipe_title}</Text>
        <Text style={styles.recipeOwner}>{recipe.user_id}</Text>
        <View style={styles.recipeImageContainer}>
          <Image
            style={styles.eventImage}
            source={{ uri: recipe.recipe_picture }}
          />
        </View>
        <Text style={styles.recipeDescription}> {recipe.recipe_description} </Text>
        <Text style={styles.ingredientHeader}>Ingredients</Text>
        <View style={styles.ingredientList}>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.bulletPoint}>🔘</Text>
              <Text style={styles.recipeIngredient}>{ingredient}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.instructionHeader}>Instructions</Text>
        <View style={styles.instructionList}>
          {recipe.insturctions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={styles.bulletPoint}>🥣</Text>
              <Text style={styles.recipeInstruction}>{instruction}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>

  );
};


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
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const navigation = useNavigation();

  const handleImagePress = (result) => {
    console.log("Image pressed:", result.recipe_title);
    navigation.navigate("Recipe", { recipe: result });
  };

  return (
    // TODO: once we click friends, need to have a screen that shows all friends..?
    // TODO: if not divisible by 3 recipes, image structure is broken + cant scroll down
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userProfile.profile_picture }}
            style={styles.profileImage}
          />
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{userProfile.user_id}</Text>
            <Text style={styles.bio}>
              Cooking Level: {userProfile.cooking_level}
            </Text>
            <Text style={styles.bio}>
              Dietary Restrictions:{" "}
              {!userProfile.dietary_restrictions
                ? []
                : userProfile.dietary_restrictions.length == 0
                  ? "None"
                  : userProfile.dietary_restrictions.join(", ")}
            </Text>
          </View>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {recipeList ? recipeList.length : []}
            </Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {userProfile.friends ? userProfile.friends.length : []}
            </Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          {/* <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View> */}
        </View>
        <View style={styles.posts}>
          {recipeList.map((recipe, index) => (
            <Pressable onPress={() => handleImagePress(recipe)}>
              <Image
                key={index}
                style={styles.postImage}
                source={{ uri: recipe.recipe_picture }}
              />
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const MainStack2 = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="Profile"
        component={HomeScreen}
        options={{ headerShown: false }} // hide the header for Page screen
      />
      <Stack2.Screen
        name="Recipe"
        component={RecipeDetail}
        options={{
          headerStyle: {
            backgroundColor: Themes.colors.darkShade,
          },
          headerTintColor: "honeydew",
        }}
      />
    </Stack2.Navigator>
  );
};

export default MainStack2;




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




  // containers for the recipe landing page
  container2: {
    flexGrow: 1,
    backgroundColor: Themes.colors.background,
    width: "100%",
  },
  recipeContent: {
    padding: 16,
  },
  recipeImageContainer: {
    height: windowHeight * 0.3,
    width: "100%",
    alignItems: "center",
  },
  eventImage: {
    height: "100%",
    width: "100%",
  },
  recipeTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "honeydew",
  },
  recipeOwner: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    color: "honeydew",
    marginRight: 10,
  },
  recipeDescription: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "honeydew",
    marginBottom: 20,
  },
  ingredientHeader: {
    marginLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: Themes.colors.lightShade,
  },
  ingredientList: {
    alignItems: "center",
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    textAlign: 'center',
  },
  bulletPoint: {
    marginRight: 5,
    fontSize: 20,
    color: '',
  },
  recipeIngredient: {
    fontSize: 20,
    color: "honeydew",
  },

  instructionHeader: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: Themes.colors.lightShade,
  },
  instructionList: {
    marginLeft: 30,
    marginRight: 30,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    textAlign: 'center',
  },
  bulletPoint: {
    marginRight: 5,
    fontSize: 20,
    color: Themes.colors.lightShade,
  },
  recipeInstruction: {
    fontSize: 20,
    color: "honeydew",
  },
});



