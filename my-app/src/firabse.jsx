import React from 'react';
import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {getMetadata} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5kdX3TUStnT4qYXtFtF2ijWK1RkTFPVg",
    authDomain: "clone-facebook-8aeba.firebaseapp.com",
    projectId: "clone-facebook-8aeba",
    storageBucket: "clone-facebook-8aeba.appspot.com",
    messagingSenderId: "380030812338",
    appId: "1:380030812338:web:2f776d7c3b0ae801cd89ab",
    measurementId: "G-MZ392XMFM4"
  };


const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);

    export{db, provider, auth, storage, getMetadata};

    const Firebase = () => {
        return null;
      };
      
      export default Firebase;