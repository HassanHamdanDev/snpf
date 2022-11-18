import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './login.css';
import { provider } from './firebase';
import { login } from './features/appSlice';

export default function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        // sign in logic 
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            dispatch(login({
                username: user.displayName,
                profilePic: user.photoURL,
                id: user.uid,
            }));
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode, errorMessage, email, credential)
        });
    }

    return (
        <div className="login">
            <div className="login_cont">
                <img src="https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2019/08/p-1-90389667-snap-logo-update.jpg" alt="" />
                <Button variant='outlined' onClick={signIn}>Sign in</Button>
            </div>
        </div>
    )
}
