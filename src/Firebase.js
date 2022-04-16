// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlbb0QV3xyvrwrSEsPSLSVwfPK7KO4B5A",
  authDomain: "testapp-ef926.firebaseapp.com",
  projectId: "testapp-ef926",
  storageBucket: "testapp-ef926.appspot.com",
  messagingSenderId: "913645402875",
  appId: "1:913645402875:web:bd899777bf40eb39540e5e"
};

// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const firestore=firebase.firestore();
const db = getFirestore(app);
export const database={
  users:firestore.collection("users"),
}
export {auth,firestore,db};