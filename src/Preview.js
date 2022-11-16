import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import './Preview.css';
import { v4 as uuid } from 'uuid';
import { db, storage } from './firebase';
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
export default function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate('/');
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    // upload base64 image to firebase storage
    uploadString(ref(storage, `posts/${id}.jpg`), cameraImage, 'data_url').then((snap) => {
      getDownloadURL(snap.ref).then((url) => {
        // add post to firestore
        setDoc(doc(db, 'posts', id), {
          imageUrl: url,
          username: 'test',
          read: false,
          profilePic: '',
          timestamp: serverTimestamp(),
        });
        // navigate('/chats');
      });
    });

  };

  return (
    <div className='preview'>
      <CloseIcon className='preview__close'
        onClick={closePreview}
      />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt='' />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview__SendIcon' />
      </div>
    </div>
  )
}
