import firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBO5VLt3tibXHZKMFlAgzjpSkqTrxoY4Wc",
  authDomain: "ty-project-4050d.firebaseapp.com",
  databaseURL: "https://ty-project-4050d.firebaseio.com",
  projectId: "ty-project-4050d",
  storageBucket: "ty-project-4050d.appspot.com",
  messagingSenderId: "922654584634",
  appId: "1:922654584634:web:a429377965b16d4441aa03",
  measurementId: "G-SWXNDEMVK6"
};

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase 