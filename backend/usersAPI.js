import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { storage } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";
import { uploadImage } from './imagesAPI';

export const createUserData = async (userProfile) => {
  // need to create blank friends collection
  try {
    const q = query(collection(db, "users"), where("user_id", "==", userProfile.user_id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      throw new Error('User already ready exists');
    };
    userProfile = {
      ...userProfile,
      "friend_requests": [],
      "friends": [],
      "pending_requests": []
    };
    
    // Image Handling
    const imageUri = userProfile.profile_picture;
    const downloadURL = await uploadImage(imageUri, 'users');
    userProfile['profile_picture'] = downloadURL;

    await addDoc(collection(db, 'users'), userProfile);
    console.log('User data created successfully');
    return userProfile;
  } catch (error) {
    console.log('Error', error.message);
    return;
  };
}

export const updateUserData = async (userProfile) => { // Image uploads can be tackled last.. Bit complicated
  let userDocId;
  const q = query(collection(db, "users"), where("user_id", "==", userProfile.userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userDocId = doc.id;
  });

  // Update the document with new data
  const docRef = doc(db, "users", userDocId);
  await updateDoc(docRef, userProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
}

export const loadUserData = async (userId) => {
  const q = query(collection(db, "users"), where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  let userData = null; // Initialize an empty object to hold user data

  querySnapshot.forEach((doc) => {
    // Assuming there's only one document with this user_id
    userData = { ...doc.data() }; // Combine doc.id with doc.data()
  });

  if (userData) {
    console.log("User data successfully retrieved", userData);
    return userData; // Return the userData as a dictionary
  } else {
    console.error("No user found with the given user_id");
    return {}; // Return an empty object if no user was found
  }
}

export const userLogin = async (userName, Password) => {
  try {
    // search for the username
    const q = query(collection(db, "users"), where("user_id", "==", userName));
    const querySnapshot = await getDocs(q);
    // throw an error if there is non match for the username or 
    //if the password does not match for that username
    if (querySnapshot.size == 0 || querySnapshot.docs[0].data().password != Password) {
      throw new Error('Sorry, you entered an incorrect username or password');
    };
    await addDoc(collection(db, 'users'), userProfile);
    console.log('User login successful');
  } catch (error) {
    console.log('Error', error.message);
    return;
  };
}