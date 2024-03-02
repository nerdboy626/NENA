import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";

export const sendFriendRequest = async (requester, requestee) => {
    // access the friend doc for the requester
    const q1 = query(collection(db, "users"), where("user_id", "==", requester))
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      requesterDocId = doc.id;
    });
    const requesterProfile = doc(db, "users", requesterDocId)
  
    // access the friend doc for the requester
    const q2 = query(collection(db, "users"), where("user_id", "==", requestee))
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      requesteeDocId = doc.id;
    });
    const requesteeProfile = doc(db, "users", requesteeDocId)
  
    // add the requester to the requestee's firend requests collection
    requesteeProfile.friend_requests = requesteeProfile.friend_requests.push(requester) 
  
    requesterProfile.pending_requests = requesterProfile.pending_requests.push()
  
    await addDoc(collection(db, 'recipes'), recipe);
    console.log('Recipe uploaded successfully');
  }
  