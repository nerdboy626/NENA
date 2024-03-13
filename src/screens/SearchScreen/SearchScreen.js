import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Pressable, Button, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Themes } from "../../../assets/Themes";
import {
  addDoc,
  collection,
  query,
  get,
  where,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  FirestoreError,
} from "firebase/firestore";
import { FIRESTORE_DB as db } from "../../../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { getPublicRecipes } from "../../../backend/searchAPI";
import { ScrollView } from "react-native";
import { Link } from "expo-router/";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Stack = createStackNavigator();

const RecipeLandingStack = ({ route }) => {
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



//export default function Page() {
const SearchResults = () => {
  const navigation = useNavigation();

  const handlePress = (result) => {
    navigation.navigate("Recipe", { recipe: result });
  };
  const [typed, setTyped] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async () => {
    // Perform search logic here based on the typed query
    // For demonstration, let's just set some dummy search results

    try {
      const results = await getPublicRecipes("example user", typed);
      setSearchResults(results);

    } catch (error) {
      console.error("Error performing search:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholderTextColor="honeydew"
              onChangeText={(newText) => setTyped(newText)}
              placeholder="What are you looking for?"
              value={typed}
            />
            <Pressable onPress={performSearch}>
              <View>
                <Ionicons name="search" size={40} color={"black"} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.searchResultsContainer}>
          {searchResults.map((result) => (
            <Pressable key={result.id} onPress={() => handlePress(result)}>
              <View style={styles.searchResult}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: result.recipe_picture }}
                    style={styles.searchResultImage}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.searchResultName}>
                    {result.recipe_title}
                  </Text>
                  <Text style={styles.searchResultUser}>{result.user_id}</Text>
                  <Text style={styles.searchResultDescription}>
                    {result.recipe_description}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function SearchScreen() {
  return (
    <Stack.Navigator initialRouteName="SearchResults">
      <Stack.Screen
        name="Search Results"
        component={SearchResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeLandingStack}
        options={{
          headerStyle: {
            backgroundColor: Themes.colors.darkShade,
          },
          headerTintColor: "honeydew",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  // containers for the search page
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.colors.background,
  },
  search: {
    width: "100%",
    backgroundColor: Themes.colors.medShade,
    borderColor: Themes.colors.medShade,
    borderWidth: 2, // Adjust border width as needed
    borderRadius: 30, // Adjust border radius as needed
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: "100%",
    width: "80%",
    color: "honeydew",
    fontSize: 20,
  },
  searchResultsContainer: {
    width: "100%",
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Themes.colors.darkShade,
    borderRadius: 5,
    marginTop: 40,
    marginLeft: 10,
  },
  searchResult: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Adjust spacing between search results as needed
  },
  imageContainer: {
    marginLeft: 0, // Adjust margin as needed
    marginRight: 10,
  },
  searchResultImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  searchResultName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5, // Adjust spacing between title and other text as needed
    color: "honeydew",
  },
  searchResultUser: {
    fontSize: 16,
    marginBottom: 5, // Adjust spacing between user and description as needed
    color: "honeydew",
  },
  searchResultDescription: {
    fontSize: 14,
    width: "60%",
    color: "honeydew",
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
