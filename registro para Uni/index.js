import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//import { getFirestore } from "./node_modules/firebase/firebase-firestore-lite.js";

const firebaseConfig = {
    apiKey: "AIzaSyA5gwMpnDhbztikwW6ANArB6YFtzZwCc-E",
    authDomain: "ts-01-5ad12.firebaseapp.com",
    projectId: "ts-01-5ad12",
    storageBucket: "ts-01-5ad12.appspot.com",
    messagingSenderId: "393686619133",
    appId: "1:393686619133:web:81356febe0549de3fa7f94",
    measurementId: "G-P45PBMS6YW"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
   
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  }
});
