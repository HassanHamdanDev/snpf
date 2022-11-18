/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import WebCamCapture from './WebCamCapture';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './Preview.js';
import Chats from './Chats.js';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { getAuth } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // user is logged in
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt="" className="app__logo" />
            <div className="app__body">
              <div className="app__bodybackground">
                <Routes>
                  <Route path="/" element={<WebCamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
