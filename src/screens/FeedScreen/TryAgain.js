import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";

//import { Link } from "expo-router";
//import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TryAgain = () => {
  return (
    <SafeAreaView>
      <View style={styles.componentContainer}>
        <View style={styles.smallerContainer}>
          <Entypo name="emoji-sad" size={24} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Oh no! It seems like none of your friends have uploaded any
              recipes
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TryAgain;

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    //borderColor: "red",
    //borderWidth: 5,
  },
  smallerContainer: {
    alignItems: "center",
    justifyContent: "center",
    //borderColor: "orange",
    //borderWidth: 5,
    width: "60%",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
