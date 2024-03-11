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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Themes } from "../../../assets/Themes";
import { SafeAreaView } from "react-native-safe-area-context";
import { createRecipe } from "../../../backend/recipesAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImagePickerWithdescription = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [procedure, setProcedure] = useState([]);
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
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleIngredientChange = (text, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = text;
    setIngredients(updatedIngredients);
  };

  const handleProcedureChange = (text, index) => {
    const updatedProcedure = [...procedure];
    updatedProcedure[index] = text;
    setProcedure(updatedProcedure);
  };

  const toggleSwitch = () => {
    setIsPublic((previousState) => !previousState);
  };

  const addNewIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const addNewProcedure = () => {
    setProcedure([...procedure, ""]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const removeProcedure = (index) => {
    const updatedProcedure = [...procedure];
    updatedProcedure.splice(index, 1);
    setProcedure(updatedProcedure);
  };

  const uploadData = async () => {
    try {
      let userProfile = await AsyncStorage.getItem("userProfile");
      userProfile = JSON.parse(userProfile);
      const recipe = {};
      recipe.recipe_picture = selectedImage;
      recipe.user_id = userProfile.user_id;
      recipe.recipe_title = title;
      recipe.recipe_description = description;
      recipe.insturctions = procedure;
      recipe.ingredients = ingredients;
      recipe.is_public = !isPublic;
      await createRecipe(recipe);
      Alert.alert("Upload Complete!");

      // Back to initial values
      setSelectedImage(null);
      setDescription("");
      setTitle("");
      setIngredients([]);
      setProcedure([]);
      setIsPublic(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
          style={styles.titleInput}
          multiline={true}
          placeholder="Add a Title"
          placeholderTextColor="honeydew"
          value={title}
          onChangeText={handleTitleChange}
        />
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Add a description"
          placeholderTextColor="honeydew"
          value={description}
          onChangeText={handleDescriptionChange}
        />
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View style={styles.listItem} key={index}>
              <TextInput
                style={styles.listInput}
                multiline={true}
                placeholder={`Ingredient ${index + 1}`}
                placeholderTextColor="honeydew"
                value={ingredient}
                onChangeText={(text) => handleIngredientChange(text, index)}
              />
              <TouchableOpacity onPress={() => removeIngredient(index)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add Ingredient" onPress={addNewIngredient} />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Procedure</Text>
          {procedure.map((step, index) => (
            <View style={styles.listItem} key={index}>
              <TextInput
                style={styles.listInput}
                multiline={true}
                placeholder={`Step ${index + 1}`}
                placeholderTextColor="honeydew"
                value={step}
                onChangeText={(text) => handleProcedureChange(text, index)}
              />
              <TouchableOpacity onPress={() => removeProcedure(index)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add Procedure Step" onPress={addNewProcedure} />
        </View>
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
          onPress={uploadData}
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
    color: "black",
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
  titleInput: {
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
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  listInput: {
    flex: 1,
    minHeight: 30,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "white",
  },
  removeButton: {
    color: "white",
    borderColor: "crimson",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "crimson",
    overflow: "hidden",
  },
});


export default ImagePickerWithdescription;
