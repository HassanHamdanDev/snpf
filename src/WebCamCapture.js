/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebCamCapture.css';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
}

export default function WebCamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/Preview');
    }, [webcamRef]);

    return (
        <div className='webcamCapture'>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <RadioButtonUncheckedIcon
                className='WebCamCapture__button'
                fontSize='large'
                onClick={capture}
            />
        </div>
    )
}
