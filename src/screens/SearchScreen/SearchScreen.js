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
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../../../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";
import { getPublicRecipes } from "../../../backend/searchAPI";
import { ScrollView } from "react-native";
import { Link } from "expo-router";


//import { getPublicRecipes } from "../../../backend/searchAPI";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const [typed, setTyped] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async () => {
    // Perform search logic here based on the typed query
    // For demonstration, let's just set some dummy search results

    try {
      const results = await getPublicRecipes("example user", typed)
      setSearchResults(results);
      console.log("You searched for", typed)
      console.log("Search Results", searchResults)
    } catch (error) {
      console.error('Error performing search:', error);
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
          {searchResults.map(result => (
          <Link
          href = {{
            pathname: "/RecipeLanding",
            params : {
              recipe: result, // passing the recipe dictionary
            },
          }}
          asChild
          >
            <Pressable>

                <View key={result.id} style={styles.searchResult}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: result.recipe_picture }} 
                      style={styles.searchResultImage}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.searchResultName}>{result.recipe_title}</Text>
                    <Text style={styles.searchResultUser}>{result.user_id}</Text>
                    <Text style={styles.searchResultDescription}>{result.recipe_description}</Text>
                  </View>
                </View>
              </Pressable>
            </Link> 


          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Adjust spacing between search results as needed
  },
  imageContainer: {
    marginLeft: 0, // Adjust margin as needed
    marginRight: 10
  },
  searchResultImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  searchResultName: {
    fontWeight: 'bold',
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
});
