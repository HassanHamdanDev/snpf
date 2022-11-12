import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC_XUfKgpfCZ2eqobbUwYCs7-mM8dRy0uI",
    authDomain: "snap-clone-2.firebaseapp.com",
    projectId: "snap-clone-2",
    storageBucket: "snap-clone-2.appspot.com",
    messagingSenderId: "984081141328",
    appId: "1:984081141328:web:6b8e870209e8bfca828b55"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
