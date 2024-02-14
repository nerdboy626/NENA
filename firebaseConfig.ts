import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDl9sxkeNsyDShPfeNO8CR55N5YP90FLkc",
  authDomain: "cs194wdatabase.firebaseapp.com",
  projectId: "cs194wdatabase",
  storageBucket: "cs194wdatabase.appspot.com",
  messagingSenderId: "161254168083",
  appId: "1:161254168083:web:6f497aed0bc510000bd1e6",
  measurementId: "G-5L90PHBMSJ"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP); 