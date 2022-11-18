import { Avatar } from '@material-ui/core';
import React from 'react';
import './chat.css';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export default function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = () => {
        // open chat
        if (!read) {
            // mark chat as read
            // update read status to true in firestore db v9
            updateDoc(doc(db, "posts", id), {
                read: true
            });
        }
        dispatch(selectImage(imageUrl));
        navigate('/chats/view');
    }
    return (
        <div onClick={open} className='chat'>
            <Avatar className="chat__image" src={profilePic} />
            <div className="chat__details">
                <span>{username}</span>
                <p>Tap to view - <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
            </div>
            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    )
}
