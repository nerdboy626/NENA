import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Themes } from "../../../assets/Themes";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUserData } from "../../../backend/usersAPI";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../../../backend/friendsAPI";

const FriendsScreen = () => {
  const [username, setUsername] = useState([]);
  const [friendUsername, setFriendUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleSendRequest = async () => {
    try {
      if (friendUsername.trim() === "") {
        alert("Please enter a valid username.");
        return;
      }
      // TODO: error when you have already sent a friend request to that person

      // Simulate sending a friend request
      setFriendUsername("");
      await sendFriendRequest(username, friendUsername);
      await getUserProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    // Simulate accepting a friend request
    try {
      setRefreshing(true); // Start refreshing
      const updatedUserProfile = await acceptFriendRequest(username, requestId);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
      await getUserProfile();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  const handleRejectRequest = async (requestId) => {
    // Simulate rejecting a friend request
    try {
      setRefreshing(true);
      const updatedUserProfile = await rejectFriendRequest(username, requestId);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
      await getUserProfile();
    } catch (e) {
      console.error(e);
    } finally { 
      setRefreshing(false);
    }
  };

  const getUserProfile = async () => {
    try {
      let userInfo = await AsyncStorage.getItem("userProfile");
      userInfo = JSON.parse(userInfo);
      setUsername(userInfo.user_id);
      setFriends(userInfo.friends);
      setIncomingRequests(userInfo.friend_requests);
      setOutgoingRequests(userInfo.pending_requests);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <SafeAreaView style={styles.containerSAV}>
      {refreshing ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Friend Requests</Text>
          <FlatList
            data={incomingRequests}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.requestItem}>
                <Text style={styles.friendRequests}>{item}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Accept"
                    onPress={() => handleAcceptRequest(item)}
                  />
                  <Button
                    title="Reject"
                    onPress={() => handleRejectRequest(item)}
                  />
                </View>
              </View>
            )}
          />

          <Text style={styles.title}>Send Friend Request</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="honeydew"
            value={friendUsername}
            onChangeText={(text) => setFriendUsername(text)}
          />
          <Button title="Send Request" onPress={handleSendRequest} />

          <Text style={styles.title}>Friends</Text>
          <FlatList
            data={friends}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text style={styles.friends}>{item}</Text>} // TODO: need to update  style
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSAV: {
    flex: 1,
    padding: 20,
    backgroundColor: Themes.colors.background,
    justifyContent: 'center', // Center the ActivityIndicator in the middle of the screen
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  friendRequests: {
    fontSize: 15,
    color: "white",
    flex: 1,
  },
  friends: {
    fontSize: 15,
    marginBottom: 10,
    color: "white",
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: 150,
  },
});

export default FriendsScreen;
