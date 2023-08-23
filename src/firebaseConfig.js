import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBHI3szPxl5sr7pS8W6LPhBvXC8p4JLbSY",
    authDomain: "acciojob-typingplayground.firebaseapp.com",
    projectId: "acciojob-typingplayground",
    storageBucket: "acciojob-typingplayground.appspot.com",
    messagingSenderId: "201770825685",
    appId: "1:201770825685:web:7b9cc35e60db14fe45ef5c",
    measurementId: "G-PVRGJVKSN2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebaseApp.firestore();

  export {auth, db}