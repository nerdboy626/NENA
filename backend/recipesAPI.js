import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  get,
  where,
  orderBy,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import { FIRESTORE_DB as db } from "../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { uploadImage } from "./imagesAPI";

export const createRecipe = async (recipe) => {
  const imageUri = recipe.recipe_picture;
  const downloadURL = await uploadImage(imageUri, "recipes");
  recipe["recipe_picture"] = downloadURL;

  recipe["time_stamp"] = serverTimestamp();
  await addDoc(collection(db, "recipes"), recipe);
  console.log("Recipe uploaded successfully", recipe);
  return recipe; // NGORLI + frontend: need to take care of updated recipe_picture url to the frontend
};

export const updateRecipe = async (recipe) => {
  // Image uploads can be tackled last.. Bit complicated
  let recipeId;
  // get all of the users recipes
  const q = query(
    collection(db, "recipes"),
    where("user", "==", recipe.user_id)
  );
  const querySnapshot = await getDocs(q);

  // loop over all of the user's recipes
  querySnapshot.forEach((doc) => {
    if (recipe.recipe_title == doc.data().recipe_title) {
      recipeId = doc.id;
    }
  });

  // Update the document with new data
  const docRef = doc(db, "recipes", recipeId);
  await updateDoc(docRef, recipe)
    .then(() => {
      console.log("Recipe successfully updated");
    })
    .catch((error) => {
      console.error("Error updating recipe: ", error);
    });
};

export const loadUserRecipe = async (userId) => {
  let recipeList = [];

  // access all of the recipes for each friend and sort them new to old by timestamps through a query
  const q = query(
    collection(db, "recipes"),
    where("user_id", "==", userId),
    orderBy("time_stamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    recipeList.push(data);
  });

  // return a list of the recipe data
  console.log("Recipe data successfully retrived", recipeList);
  return recipeList;
  // console.log("Recipe Feed Data Loaded")
};
