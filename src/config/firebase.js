import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDey3Iuu9sLB94fXuivKbyyQjgs_2nRlg",
  authDomain: "collabify-efaab.firebaseapp.com",
  projectId: "collabify-efaab",
  storageBucket: "collabify-efaab.appspot.com",
  messagingSenderId: "799064502062",
  appId: "1:799064502062:web:16ca5263a2d45008c0d4bf",
  measurementId: "G-8TDXT4V84B"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = getAnalytics(fire);

export default fire; 