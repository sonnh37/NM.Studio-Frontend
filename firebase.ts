// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_KEY_FIREBASE,
    authDomain: "nhu-my-studio.firebaseapp.com",
    projectId: "nhu-my-studio",
    storageBucket: "nhu-my-studio.appspot.com",
    messagingSenderId: "620273204587",
    appId: "1:620273204587:web:3455d35ac680a3fed5e02e",
    measurementId: "G-7E45JFEH96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};
