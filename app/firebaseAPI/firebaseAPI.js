import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../../firebaseConfig'
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


export const createUserData = async (userProfile) => {
  try {
    const q = query(collection(db, "users"), where("user_id", "==", userProfile.user_id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      throw new Error('User already ready exists');
    };
    await addDoc(collection(db, 'users'), userProfile);
    console.log('User data created successfully');
  } catch (error) {
    console.log('Error', error.message);
    return;
  }; 
}

export const updateUserData = async (userProfile) => {
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

export const updateUserData2 = async (userProfile) => { // dict userProfile
  //
  // {
  //   userId: 'alexpaek',
  //   password = '___',
  // }


	const userRef = doc(FIRESTORE_DB, 'users', userProfile.userId);

  // Check if the user exists
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    console.log("CALLED");
    throw new Error("User does not exist");
  }

  // Prepare the update object based on provided parameters
  // const updateData = {};
  // if (name !== undefined) updateData.username = name;
  // if (password !== undefined) updateData.password = password;
  // if (email !== undefined) updateData.email = email;
  // if (imageUrl !== undefined) updateData.profile_picture = imageUrl;
  // if (cuisine !== undefined) updateData.preferred_cuisine = cuisine;

  // Update the document with new data
  await updateDoc(userRef, userProfile);
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


  // Prepare the update object based on provided parameters
  // const updateData = {};
  // if (name !== undefined) updateData.username = name;
  // if (password !== undefined) updateData.password = password;
  // if (email !== undefined) updateData.email = email;
  // if (imageUrl !== undefined) updateData.profile_picture = imageUrl;
  // if (cuisine !== undefined) updateData.preferred_cuisine = cuisine;