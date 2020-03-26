import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBkajcqNQj05aHmPL1IlGfv3Kp4BZ6I86w",
    authDomain: "music-app-92027.firebaseapp.com",
    databaseURL: "https://music-app-92027.firebaseio.com",
    projectId: "music-app-92027",
    storageBucket: "music-app-92027.appspot.com",
    messagingSenderId: "78664938916",
    appId: "1:78664938916:web:7a70dc0b8e05f31b0d7d31",
    measurementId: "G-4CFFZFMW9S"

}

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;