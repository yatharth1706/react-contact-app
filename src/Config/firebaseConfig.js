import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseSettings = {
    apiKey: "AIzaSyBmZVO1VPOGnE2h489hoGh3O7caODOGh1g",
    authDomain: "shoppinginsta-e82a6.firebaseapp.com",
    databaseURL: "https://shoppinginsta-e82a6.firebaseio.com",
    projectId: "shoppinginsta-e82a6",
    storageBucket: "shoppinginsta-e82a6.appspot.com",
    messagingSenderId: "347424615912",
    appId: "1:347424615912:web:f8c83daea232b03178c85d",
    measurementId: "G-1FWYBJ4X10"
}

firebase.initializeApp(firebaseSettings);
const storage = firebase.storage();

export {storage, firebase as default};
 

