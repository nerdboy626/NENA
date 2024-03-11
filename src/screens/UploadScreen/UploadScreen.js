import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Themes } from "../../../assets/Themes";
import { SafeAreaView } from "react-native-safe-area-context";

const ImagePickerWithdescription = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const selectImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleIngredientsChange = (text) => {
    setIngredients(text);
  };

  const handleProcedureChange = (text) => {
    setProcedure(text);
  };

  const toggleSwitch = () => {
    setIsPublic((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create recipe</Text>
        </View>
        <TouchableOpacity
          style={styles.imagePreview}
          onPress={selectImageFromLibrary}
        >
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Text style={styles.previewText}>Tap to select an image</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Add a description"
          value={description}
          onChangeText={handleDescriptionChange}
        />
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Add a list of ingredients"
          value={ingredients}
          onChangeText={handleIngredientsChange}
        />
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Add a step-by-step procedure"
          value={procedure}
          onChangeText={handleProcedureChange}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Public</Text>
          <Switch
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={isPublic ? "white" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPublic}
          />
          <Text style={styles.switchLabel}>Private</Text>
        </View>
        <Button
          title="Upload"
          color={"white"}
          onPress={() => alert("Upload button pressed!")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  previewText: {
    fontSize: 16,
    color: "#666",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  descriptionInput: {
    width: "100%",
    minHeight: 30,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "white",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ImagePickerWithdescription;
