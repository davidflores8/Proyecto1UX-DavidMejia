import  firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration


 var firebaseConfig = {
  apiKey: "AIzaSyC8X51LzQB0t_YlACM8gWpwp9yBXQWQlKY",
  authDomain: "proyecto-ux-1151b.firebaseapp.com",
  databaseURL: "https://proyecto-ux-1151b.firebaseio.com",
  projectId: "proyecto-ux-1151b",
  storageBucket: "proyecto-ux-1151b.appspot.com",
  messagingSenderId: "722484435792",
  appId: "1:722484435792:web:6063ba1593913e5443ea55"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);
export const db= fb.firestore();