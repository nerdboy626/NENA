import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";

export const createRecipe = async (recipe) => {
  recipe.time_stamp = serverTimestamp();
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

export const loadRecipeFeedData = async (userId) => {
  const q1 = query(collection(db, "users"), where("user_id", "==", userId));
  const querySnapshot1 = await getDocs(q1);

  // access all of a users friends
  const userFriends = querySnapshot1.docs[0].data().friends;

  let recipeList = [];

  // access all of the recipes for each friend and sort them new to old by timestamps through a query
  const q2 = query(collection(db, "recipes"), where('user_id', 'in', userFriends), orderBy('time_stamp', 'desc'));
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach(doc => {
    let data = doc.data();
    recipeList.push(data);
  });

  // return a list of the recipe data
  console.log("Recipe data successfully retrived", recipeList);
  return recipeList;
  // console.log("Recipe Feed Data Loaded")
}