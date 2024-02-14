import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

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
	set(reference, {
		username: name, 
		password: password,
		email: email,
		profile_picture: imageUrl,
		preferred_cuisine: cuisine,
	});
}





