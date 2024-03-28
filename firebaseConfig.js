// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDWDXbwK9lHQdlqVeDwStbaEAwHUkOdtFM",
  authDomain: "smart-chat-28efb.firebaseapp.com",
  projectId: "smart-chat-28efb",
  storageBucket: "smart-chat-28efb.appspot.com",
  messagingSenderId: "902785880092",
  appId: "1:902785880092:web:3a22a53a44c2f7dd370fd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');