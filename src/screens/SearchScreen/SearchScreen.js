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
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Themes } from "../../../assets/Themes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const [recipeName, setRecipeName] = useState("");
  const [typed, setTyped] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {
          //<View style={styles.headerTop}>
        }
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            color="black"
            placeholderTextColor="honeydew"
            onChangeText={(newText) => setTyped(newText)}
            placeholder="What are you looking for?"
          />
          <Pressable onPress={() => setRecipeName(typed)}>
            <View>
              <Ionicons name="search" size={25} color={"black"} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.recipeImageContainer}>
          <Image
            style={styles.recipeImage}
            source={require("../../../assets/favicon.png")}
          />
        </View>
        <View style={styles.recipeNameContainer}>
          <View style={styles.recipeNameHeader}>
            <Ionicons
              name="person-circle-outline"
              size={36}
              color={Themes.colors.darkShade}
            />
            <Text numberOfLines={1} style={styles.recipeName}>
              User Name
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.recipeName}>
            This is where the recipe name would go
          </Text>
          <Text numberOfLines={1} style={styles.recipeName}>
            This is where the recipe rating would go
          </Text>
          <Text numberOfLines={2} style={styles.recipeName}>
            This is where the recipe description would go
          </Text>
        </View>
      </View>
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
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  header: {
    height: "12%",
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    borderColor: "red",
    borderWidth: 10,
    //justifyContent: "center",
    paddingHorizontal: 40,
  },
  headerTop: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "yellow",
    borderWidth: 10,
  },
  search: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    //backgroundColor: "green",
    borderColor: "green",
    borderWidth: 10,
    flexDirection: "row",
    alignItems: "center",
    //alignContent: "center",
    justifyContent: "space-around",
  },

  input: {
    height: "100%",
    width: "85%",
    margin: 7,
    padding: 15,
    //color: "black",
    fontSize: 20,
  },
  componentContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: windowHeight * 0.15,
    width: "100%",
    marginBottom: 15,
    borderWidth: 5,
    borderColor: Themes.colors.lightShade,
    borderRadius: 20,
    backgroundColor: Themes.colors.boxBackground,
  },
  recipeImageContainer: {
    height: "100%",
    width: "40%",
  },
  recipeImage: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  recipeNameContainer: {
    height: "100%",
    width: "60%",
    paddingHorizontal: 5,
    borderColor: "yellow",
    borderWidth: 3,
    //alignItems: "center",
    justifyContent: "space-around",
  },
  recipeNameHeader: {
    height: "30%",
    width: "100%",
    flexDirection: "row",
    borderColor: "blue",
    borderWidth: 1,
    alignItems: "center",
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Themes.colors.darkShade,
  },
});
