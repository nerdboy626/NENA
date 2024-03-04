import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";

export const createRecipe = async (recipe) => {
  await addDoc(collection(db, 'recipes'), recipe);
  console.log('Recipe uploaded successfully');
}

export const updateRecipe = async (recipe) => {
  let recipeId;
  // get all of the users recipes
  const q = query(collection(db, "recipes"), where("user", "==", recipe.user_id));
  const querySnapshot = await getDocs(q);

  // loop over all of the user's recipes
  querySnapshot.forEach((doc) => {
    if (recipe.recipe_title == doc.data().recipe_title) {
      recipeId = doc.id;
    }
  });

  // Update the document with new data
  const docRef = doc(db, "recipes", recipeId);
  await updateDoc(docRef, recipe).then(() => {
    console.log("Recipe successfully updated");
  }).catch((error) => {
    console.error("Error updating recipe: ", error);
  });
}