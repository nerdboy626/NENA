import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";


// onAuthStateChanged(FIREBASE_AUTH, (user) => {
//   if (user) {

//   } else {
    
//   }
// })


export const addTodo = async (num) => {
  console.log(num)
  addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test' + num, done: false })
}

// const reference = doc(FIRESTORE_DB, 'users', userId);

export const writeUserData = async (userId, name, password, email, imageUrl, cuisine) => {
	const recipeRef = doc(FIRESTORE_DB, 'recipes', userId); // What is this doing?
  addDoc(collection(FIRESTORE_DB, 'username'), {
    user_id: userId,
		username: name, 
		password: password,
		email: email,
		profile_picture: imageUrl,
		preferred_cuisine: cuisine,
		userRecipes: recipeRef
	});
}

export const updateUserData = async (userId, name, password, email, imageUrl, cuisine) => {
	const userRef = doc(FIRESTORE_DB, 'user_id', userId);

  // Check if the user exists
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    console.log("CALLED");
    throw new Error("User does not exist");
  }

  // Prepare the update object based on provided parameters
  const updateData = {};
  if (name !== undefined) updateData.username = name;
  if (password !== undefined) updateData.password = password;
  if (email !== undefined) updateData.email = email;
  if (imageUrl !== undefined) updateData.profile_picture = imageUrl;
  if (cuisine !== undefined) updateData.preferred_cuisine = cuisine;

  // Update the document with new data
  await updateDoc(userRef, updateData);
}

// Need to work on it
export const createRecipe = async (userId, title, imageUrl, ingredientList, instructionList) => {
	const reference = ref(FIRESTORE_DB, 'recipes', userId);
	await set(reference, {
		recipe_title: title, 
		recipe_picture: imageUrl,
		ingredients: ingredientList,
		instructions: instructionList,
	});
}
