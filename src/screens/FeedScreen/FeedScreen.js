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
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Stack1 = createStackNavigator();

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container2}>
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
    </ScrollView>

  );
};


const Page = () => {
  const [username, setUsername] = useState(""); // should be [ ] and not { }
  const [email, setEmail] = useState("");
  const [recipeList, setRecipes] = useState([]);
  const navigation = useNavigation();

  const handleImagePress = (result) => {
    console.log("Image pressed:", result.recipe_title);
    navigation.navigate("Recipe", { recipe: result });
  };


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
          <UpdateItem item={item} index={index} onPressImage={handleImagePress} />
        )}
      />
    );
  } else {
    contentDisplayed = <TryAgain />;
  }



  return (
    <SafeAreaView style={styles.container}>
      {recipeList.length > 0 ? (
        <FlatList
          data={recipeList}
          renderItem={({ item, index }) => (
            <UpdateItem item={item} index={index} onPressImage={handleImagePress} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <TryAgain />
      )}
    </SafeAreaView>
  );
}

const MainStack1 = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="Feed"
        component={Page}
        options={{ headerShown: false }} // hide the header for Page screen
      />
      <Stack1.Screen
        name="Recipe"
        component={RecipeDetail}
        options={{
          headerStyle: {
            backgroundColor: Themes.colors.darkShade,
          },
          headerTintColor: "honeydew",
        }}
      />
    </Stack1.Navigator>
  );
};

export default MainStack1;

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




  // containers for the recipe landing page
  container2: {
    flex: 1,
    flexDirection: "column", // Try: 'row' or 'column'
    backgroundColor: Themes.colors.background,
    width: "100%",
  },

  recipeImageContainer: {
    height: "35%",
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
