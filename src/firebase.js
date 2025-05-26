// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALsexE_qIG0o0TGM_Gn66D2AbGhfmDLVg",
  authDomain: "clancircle-ecf0b.firebaseapp.com",
  databaseURL: "https://clancircle-ecf0b-default-rtdb.firebaseio.com",
  projectId: "clancircle-ecf0b",
  storageBucket: "clancircle-ecf0b.firebasestorage.app",
  messagingSenderId: "865422713752",
  appId: "1:865422713752:web:75cf227a5230441fbec1ed",
  measurementId: "G-ME7S5D3X5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics, auth, database, storage };
