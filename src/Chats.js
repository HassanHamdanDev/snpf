import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { db } from './firebase';
import Chat from './Chat';
import './chats.css';
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { getAuth } from "firebase/auth";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

export default function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // get all posts from firestore ordered by timestamp in descending order (newest first) and add to posts state variable 
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    getDocs(q).then((querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
  }, []);

  const takeSnap = () => {
    // open camera
    dispatch(resetCameraImage());
    navigate('/');
  };

  return (
    <div className='chats'>
      <div className="chats__header">
        <Avatar
          className="chats__avatar"
          src={user.profilePic}
          onClick={() => auth.signOut()}
        />
        <div className="chats__search">
          <SearchIcon className='chats__searchIcon' />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
          <Chat
            key={id}
            id={id}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            profilePic={profilePic}
          />
        ))}
      </div>
      <RadioButtonUncheckedIcon className="chats__takePicIcon"
        fontSize="large"
        onClick={takeSnap}
      />
    </div>
  )
}
