import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";


export const getFriendsRecipes = async (userId) => {
  let userDocFriends;
  const qUser = query(collection(db, "users"), where("user_id", "==", userId));
  const querySnapshot = await getDocs(qUser);
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0]; // Accessing the first document in the snapshot
    userDocFriends = userDoc.data().friends; // Correctly accessing the friends field
  } else {
    console.error('No such user found');
    return [];
  }

  let recipesList = [];
  const MAX_QUERY_BATCH_SIZE = 10; // Firestore limitation

  for (let i = 0; i < userDocFriends.length; i += MAX_QUERY_BATCH_SIZE) {
    const batch = userDocFriends.slice(i, i + MAX_QUERY_BATCH_SIZE);
    const qFriendRecipes = query(collection(db, "recipes"), where("user_id", "in", batch));
    const querySnapshot = await getDocs(qFriendRecipes);

    const batchRecipes = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));
    
    recipesList = [...recipesList, ...batchRecipes];
  }
  recipesList.sort((a, b) => b.time_stamp.toDate() - a.time_stamp.toDate()); // Sort by posted time

  return recipesList;
}

export const getPublicRecipes = async (userId, keyword) => {
  keyword = keyword.toLowerCase();
  const qPublicRecipes = query(collection(db, "recipes"), where("is_public", "==", true));
  const querySnapshot = await getDocs(qPublicRecipes);

  const recipesList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Perform case-sensitive contains check on client side
    if (data.recipe_title.toLowerCase().includes(keyword) ||
        data.recipe_description.toLowerCase().includes(keyword) &&
        data.user_id != userId) {
      recipesList.push(data);
    }
  });

  return recipesList;
};