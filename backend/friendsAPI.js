import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, get, where, getDocs, getFirestore, doc, setDoc, getDoc, updateDoc, FirestoreError } from 'firebase/firestore';
import { FIRESTORE_DB as db } from '../firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";

export const sendFriendRequest = async (requester, requestee) => {
  // access the friend doc for the requester
  const q1 = query(collection(db, "users"), where("user_id", "==", requester));
  const querySnapshot1 = await getDocs(q1);

  // get the document and the data
  const requesterProfileDoc = doc(db, "users", querySnapshot1.docs[0].id);
  const requesterProfile = querySnapshot1.docs[0].data();

  // access the friend doc for the requester
  const q2 = query(collection(db, "users"), where("user_id", "==", requestee));
  const querySnapshot2 = await getDocs(q2);

  // get the document and the data
  const requesteeProfileDoc = doc(db, "users", querySnapshot2.docs[0].id);
  const requesteeProfile = querySnapshot2.docs[0].data();

  // add the requester to the requestee's friend requests collection
  let tempArray = requesteeProfile.friend_requests;
  tempArray.push(requester)
  requesteeProfile.friend_requests = tempArray;

  // add the requestee to the requester's pending_requests collection
  tempArray = requesterProfile.pending_requests;
  tempArray.push(requestee)
  requesterProfile.pending_requests = tempArray;

  // update the documents
  await updateDoc(requesteeProfileDoc, requesteeProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });

  await updateDoc(requesterProfileDoc, requesterProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });

  console.log('Friend request sucessfully sent');
}

export const acceptFriendRequest = async (requester, requestee) => {
  // access the friend doc for the requester
  const q1 = query(collection(db, "users"), where("user_id", "==", requester));
  const querySnapshot1 = await getDocs(q1);

  // get the document and the data
  const requesterProfileDoc = doc(db, "users", querySnapshot1.docs[0].id);
  const requesterProfile = querySnapshot1.docs[0].data();

  // access the friend doc for the requester
  const q2 = query(collection(db, "users"), where("user_id", "==", requestee));
  const querySnapshot2 = await getDocs(q2);

  // get the document and the data
  const requesteeProfileDoc = doc(db, "users", querySnapshot2.docs[0].id);
  const requesteeProfile = querySnapshot2.docs[0].data();

  // remove the requester from friend requests and add to friends
  let tempArray = requesteeProfile.friends;
  tempArray.push(requester);
  requesteeProfile.friends = tempArray;
  tempArray = requesteeProfile.pending_requests.filter(item => item !== requester);
  requesteeProfile.pending_requests = tempArray

  // remove the requestee from pending and add to friends
  tempArray = requesterProfile.friends;
  tempArray.push(requestee);
  requesterProfile.friends = tempArray;
  tempArray = requesterProfile.friend_requests.filter(item => item !== requestee);
  requesterProfile.friend_requests = tempArray

  // update the documents
  await updateDoc(requesteeProfileDoc, requesteeProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });

  await updateDoc(requesterProfileDoc, requesterProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  })

  console.log("Overall Friend Request Successfully Accepted");
  return requesterProfile;
}


export const rejectFriendRequest = async (requester, requestee) => {
  // access the friend doc for the requester
  const q1 = query(collection(db, "users"), where("user_id", "==", requester));
  const querySnapshot1 = await getDocs(q1);

  // get the document and the data
  const requesterProfileDoc = doc(db, "users", querySnapshot1.docs[0].id);
  const requesterProfile = querySnapshot1.docs[0].data();

  // access the friend doc for the requester
  const q2 = query(collection(db, "users"), where("user_id", "==", requestee));
  const querySnapshot2 = await getDocs(q2);

  // get the document and the data
  const requesteeProfileDoc = doc(db, "users", querySnapshot2.docs[0].id);
  const requesteeProfile = querySnapshot2.docs[0].data();

  // remove the requester from friend requests
  let tempArray = requesteeProfile.pending_requests.filter(item => item !== requester);
  requesteeProfile.pending_requests = tempArray

  // remove the requestee from pending and add to friends
  tempArray = requesterProfile.friend_requests.filter(item => item !== requestee);
  requesterProfile.friend_requests = tempArray

  // update the documents
  await updateDoc(requesteeProfileDoc, requesteeProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });

  await updateDoc(requesterProfileDoc, requesterProfile).then(() => {
    console.log("Document successfully updated");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  })

  console.log("Overall Friend Request Successfully Rejected");
  return requesterProfile;
}
