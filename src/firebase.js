import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_XUfKgpfCZ2eqobbUwYCs7-mM8dRy0uI",
    authDomain: "snap-clone-2.firebaseapp.com",
    projectId: "snap-clone-2",
    storageBucket: "snap-clone-2.appspot.com",
    messagingSenderId: "984081141328",
    appId: "1:984081141328:web:6b8e870209e8bfca828b55"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

provider.setCustomParameters({ prompt: 'select_account' });
