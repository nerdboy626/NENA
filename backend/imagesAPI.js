import { FIREBASE_STORAGE as storage } from '../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'images/' + new Date().toISOString());
    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, blob);
    console.log('Uploaded a blob or file!', snapshot);

    // After upload completes, get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    return downloadURL; // Return the download URL
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null; // Return null or throw an error as needed
  }
}