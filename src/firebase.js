import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDshoPBtsd0yvW5ZLKsS6_GEY_RgdCzYHo",
  authDomain: "doctor-project-22c0d.firebaseapp.com",
  databaseURL: "https://doctor-project-22c0d.firebaseio.com",
  projectId: "doctor-project-22c0d",
  storageBucket: "doctor-project-22c0d.appspot.com",
  messagingSenderId: "208935734891",
  appId: "1:208935734891:web:859e791e4f9ef4bf"
};

firebase.initializeApp(firebaseConfig);

export default firebase