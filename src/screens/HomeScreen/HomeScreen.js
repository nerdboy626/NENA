import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sample from "../../../assets/favicon.png";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.profileImage} source={Sample} />
        <View style={styles.userInfoText}>
          <Text style={styles.username}>Your Username</Text>
          <Text style={styles.bio}>Your Bio</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <View style={styles.posts}>
        <Image style={styles.postImage} source={Sample} />
        <Image style={styles.postImage} source={Sample} />
        <Image style={styles.postImage} source={Sample} />
      </View>
    </SafeAreaView>
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
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
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
