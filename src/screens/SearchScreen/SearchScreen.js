import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Themes } from "../../../assets/Themes";

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
            onChangeText={(newText) => setTyped(newText)}
            placeholder="Input a recipe you are searching for"
          />
          <Pressable onPress={() => setRecipeName(typed)}>
            <View>
              <Ionicons name="search" size={25} color={"black"} />
            </View>
          </Pressable>
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
    height: "10%",
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
    height: "90%",
    width: "90%",
    borderRadius: 10,
    //backgroundColor: "green",
    borderColor: "green",
    borderWidth: 10,
    flexDirection: "row",
    alignItems: "center",
    //alignContent: "center",
    justifyContent: "space-around",
  },
});
