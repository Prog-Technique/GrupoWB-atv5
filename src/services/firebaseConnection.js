import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

let firebaseConfig = {
  apiKey: "AIzaSyDac0qpQ6LL7N-ET_EWVbzsjm6E8ReeEKI",
  authDomain: "grupowb-a98fe.firebaseapp.com",
  projectId: "grupowb-a98fe",
  storageBucket: "grupowb-a98fe.appspot.com",
  messagingSenderId: "540424801820",
  appId: "1:540424801820:web:d577daba94d09be4c519d9",
  measurementId: "G-S2FVL6G66M"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;