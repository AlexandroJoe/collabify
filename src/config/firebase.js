import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZoxOT_oyQO5mSiL-HViA3l2Zy4SOghnc",
  authDomain: "collabify-b0dd7.firebaseapp.com",
  projectId: "collabify-b0dd7",
  storageBucket: "collabify-b0dd7.appspot.com",
  messagingSenderId: "469034833060",
  appId: "1:469034833060:web:59779cef02c4935fb70231",
  measurementId: "G-K2N2Z178C7"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = getAuth(fire);
const fs = getFirestore(fire);
const analytics = getAnalytics(fire);

export { fire, auth, fs }; 