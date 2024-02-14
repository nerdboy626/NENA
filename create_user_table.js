import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {

}

const app = initialize(firebaseConfig);


function writeUserData(userId, name, password, email, imageUrl, cuisine){		const db = getDatabase();
	const reference = ref(db, 'users/' + userId);
	set(reference, {
		username: name, 
		password: password,
		email: email,
		profile_picture: imageUrl,
		preferred_cuisine: cuisine,
	});
}





