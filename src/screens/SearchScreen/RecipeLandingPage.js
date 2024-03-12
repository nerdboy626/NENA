import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as React from "react";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";

const RecipeLanding = () => {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name,
          headerTintColor: Themes.colors.header, // this is how to change the color of the back arrow
          headerStyle: {
            backgroundColor: Themes.colors.boxBackground,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: Themes.colors.header,
          },
        }}
      />
      <View style={styles.recipeImageContainer}>
        <Image
          style={styles.eventImage}
          source={{ uri: params.recipe.recipe_image }}
        />
      </View>
      <Text style={styles.header}> Recipe Rating</Text>
      <Text style={styles.header}> {recipe.recipe_description}</Text>
      <Text style={styles.header}> Recipe Ingreditents</Text>
    </View>
  );
};

export default eventDescriptionView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Try: 'row' or 'column'
    alignItems: "center", // Try: 'flex-start' or 'center' or 'flex-end'
    backgroundColor: Themes.colors.background,
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Themes.colors.darkShade,
  },
  descriptionContainer: {
    width: "100%",
    height: "25%",
    padding: 5,
    justifyContent: "space-around",
    borderColor: Themes.colors.lightShade,
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: Themes.colors.boxBackground,
  },
  subHeader: {
    flexDirection: "row",
  },
  paragraph: {
    fontSize: 24,
    fontWeight: "bold",
    color: Themes.colors.darkShade,
  },
  linkText: {
    fontSize: 16,
    color: "blue",
  },
  recipeImageContainer: {
    height: "35%",
    width: "100%",
    alignItems: "flex-start",
    //borderWidth: 8,
    //borderColor: Themes.colors.lightShade,
    //marginHorizontal: 5,
    //borderRadius: 20,
  },
  eventImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  goingContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    borderColor: Themes.colors.lightShade,
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: Themes.colors.boxBackground,
    padding: 5,
  },
  randomUser: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  userName: {
    fontSize: 20,
    color: Themes.colors.darkShade,
  },
});
