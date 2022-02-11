// Impot init with firebase
import { initializeApp } from "firebase/app";
import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { getDatabase, ref, get, child} from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// web app Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGBgCHi5D1dOT4_cLp5IJPdRYqvKXeRCw",
    authDomain: "to-do-f76b9.firebaseapp.com",
    databaseURL: "https://to-do-f76b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "to-do-f76b9",
    storageBucket: "to-do-f76b9.appspot.com",
    messagingSenderId: "126522701192",
    appId: "1:126522701192:web:21a2c0143973fd26a1b63d",
    measurementId: "G-YH5HHSYNBQ"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const starCountRef = ref(db);



// API for LocalStorage 
export default function TEST () {
    localStorage.setItem('name', 'TO-DO list "react appp"')
}

export const AuthAPI = {
    signIn(login, password){
        return signInWithEmailAndPassword (auth, login, password)
        .then((userCredential) => userCredential.user.uid)
    },
    createAccount(login, password){
        return createUserWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
          return userCredential.user.uid;
        })
    },
    getDatabase(id){
        console.log(id)
        return get(child(starCountRef, `todos/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val(), id);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        });
    }
}


export const LocalData = {
    getState(stateName){
        return  localStorage.getItem(stateName);
    },
    setState(stateName, stateNew){
        return localStorage.setItem(stateName, JSON.stringify(stateNew))
    }
}