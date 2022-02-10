// Impot init with firebase
import { initializeApp } from "firebase/app";
import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl4LWfh3Y6IOOUy_oCTuSpZvonWqRdOJw",
  authDomain: "to-do-430d2.firebaseapp.com",
  projectId: "to-do-430d2",
  storageBucket: "to-do-430d2.appspot.com",
  messagingSenderId: "566514319649",
  appId: "1:566514319649:web:79c5d3fd445c63dc1f7e60",
  measurementId: "G-M1YBCY1N4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log(app)


// API for LocalStorage 
export default function TEST () {
    localStorage.setItem('name', 'TO-DO list "react appp"')
}

export const AuthAPI = {
    signIn(login, password){
        return signInWithEmailAndPassword (auth, login, password)
        .then((userCredential) => {
          const user = userCredential;
          console.log(userCredential)
          return user
        })
    },
    createAccount(login, password){
        return createUserWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
          const user = userCredential;
          console.log(user)
        })
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