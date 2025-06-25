// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPA-KZzoMdqvp2XFafglm_FjsyutLUNBA",
  authDomain: "astro-authentication-603e9.firebaseapp.com",
  projectId: "astro-authentication-603e9",
  storageBucket: "astro-authentication-603e9.firebasestorage.app",
  messagingSenderId: "461635586190",
  appId: "1:461635586190:web:0bcc097f149ac3fea0e1df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {
    app, auth
}