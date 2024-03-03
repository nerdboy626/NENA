import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../../../assets/Themes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.updateContainer}>
        <View style={styles.updateHeader}>
          <Ionicons
            name="person-circle-outline"
            size={60}
            color={Themes.colors.darkShade}
          />
          <Text numberOfLines={1} style={styles.userProfile}>
            User Name
          </Text>
        </View>
        <View style={styles.recipeImageContainer}>
          <Image
            style={styles.recipeImage}
            source={require("../../../assets/favicon.png")}
          />
        </View>
        <View style={styles.updateFooter}>
          <Text numberOfLines={1} style={styles.recipeDescription}>
            This is where the recipe name would go
          </Text>
          <Text numberOfLines={1} style={styles.recipeDescription}>
            This is where the recipe rating would go
          </Text>
          <Text numberOfLines={2} style={styles.recipeDescription}>
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
  updateContainer: {
    alignItems: "center",
    height: windowHeight * 0.7,
    width: "100%",
    marginBottom: 15,
    borderWidth: 5,
    borderColor: Themes.colors.lightShade,
    borderRadius: 20,
    backgroundColor: Themes.colors.boxBackground,
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
    //borderTopLeftRadius: 15,
    //borderBottomLeftRadius: 15,
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
});
