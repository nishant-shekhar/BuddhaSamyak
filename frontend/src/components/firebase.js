// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_ev1O8mWedHQ4Nw0TXPnEDbdZsb_udMw",
  authDomain: "grocers-cab.firebaseapp.com",
  databaseURL: "https://grocers-cab.firebaseio.com",
  projectId: "grocers-cab",
  storageBucket: "grocers-cab.appspot.com",
  messagingSenderId: "922956878393",
  appId: "1:922956878393:web:05a040efd17286823733e8",
  measurementId: "G-NG851TVVLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
