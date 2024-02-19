import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl9sxkeNsyDShPfeNO8CR55N5YP90FLkc",
  authDomain: "cs194wdatabase.firebaseapp.com",
  projectId: "cs194wdatabase",
  storageBucket: "cs194wdatabase.appspot.com",
  messagingSenderId: "161254168083",
  appId: "1:161254168083:web:6f497aed0bc510000bd1e6",
  measurementId: "G-5L90PHBMSJ"
}

const app = initialize(firebaseConfig);

function writeUserData(userId, name, password, email, imageUrl, cuisine){		
	const db = getDatabase();
	const reference = ref(db, 'users/' + userId);
	const recipeRef = db.collection('recipes').doc(userId);
	set(reference, {
		username: name, 
		password: password,
		email: email,
		profile_picture: imageUrl,
		preferred_cuisine: cuisine,
		userRecipes: = recipeRef
	});
}


async function createRecipe(userId, title, imageUrl, ingredientList, instructionList){		
	const db = getFirestore();
	const reference = ref(db, 'recipes' + userId);
	await set(reference, {
		recipe_title: title, 
		recipe_picture: imageUrl,
		ingredients: ingredientList,
		instructions: instructionList,
	});
}
