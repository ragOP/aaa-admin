import React, { useState, useEffect } from "react";
import { PauseCircleIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";

const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
      console.error("Microphone permission denied:", err);
    });
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      let chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioChunks([]);
        if (onRecordingComplete) onRecordingComplete(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
        Voice Note
      </label>
      <IconButton onClick={toggleRecording} color="primary" size="large">
        {isRecording ? (
          <PauseCircleIcon className="h-10 w-10" />
        ) : (
          <MicrophoneIcon className="h-10 w-10" />
        )}
      </IconButton>

      {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
    </div>
  );
};

export default AudioRecorder;
