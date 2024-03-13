import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Themes } from "../../../assets/Themes";
import { SafeAreaView } from "react-native-safe-area-context";

const FriendsScreen = () => {
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const handleSendRequest = () => {
    if (username.trim() === "") {
      alert("Please enter a valid username.");
      return;
    }

    // Simulate sending a friend request
    setOutgoingRequests([
      ...outgoingRequests,
      { id: outgoingRequests.length + 1, username },
    ]);
    setUsername("");
  };

  const handleAcceptRequest = (requestId) => {
    // Simulate accepting a friend request
    const updatedIncomingRequests = incomingRequests.filter(
      (request) => request.id !== requestId
    );
    setIncomingRequests(updatedIncomingRequests);
    setFriends([
      ...friends,
      updatedIncomingRequests.find((request) => request.id === requestId),
    ]);
  };

  const handleRejectRequest = (requestId) => {
    // Simulate rejecting a friend request
    const updatedIncomingRequests = incomingRequests.filter(
      (request) => request.id !== requestId
    );
    setIncomingRequests(updatedIncomingRequests);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Friend Requests</Text>
      <FlatList
        data={incomingRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text>{item.username}</Text>
            <Button
              title="Accept"
              onPress={() => handleAcceptRequest(item.id)}
            />
            <Button
              title="Reject"
              onPress={() => handleRejectRequest(item.id)}
            />
          </View>
        )}
      />

      <Text style={styles.title}>Send Friend Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="honeydew"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Send Request" onPress={handleSendRequest} />

      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Themes.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
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
});

export default FriendsScreen;
