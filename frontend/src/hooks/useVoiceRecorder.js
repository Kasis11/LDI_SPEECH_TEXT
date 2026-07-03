import { useRef, useState } from "react";
import { uploadAudio } from "../services/voiceService";

export default function useVoiceRecorder(onTranscript) {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [uploadedAudio, setUploadedAudio] = useState(null);
  // const [transcript, setTranscript] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  // const uploadRecording = async (blob) => {
  //   try {
  //     const response = await uploadAudio(blob);

  //     console.log("Upload Success:", response);

  //     setUploadedAudio(response);

  //     setTranscript(response.transcript);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Upload Failed:", error);
  //   }
  // };

  const uploadRecording = async (blob) => {
    const response = await uploadAudio(blob);

    setUploadedAudio(response);

    if (onTranscript) {
      onTranscript(response);
    }

    return response;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl(url);

        const response = await uploadRecording(blob);

        stream.getTracks().forEach((track) => track.stop());

        setIsRecording(false);
        clearInterval(timerRef.current);
        setIsPaused(false);

        // Return the response
        return response;
      };

      mediaRecorder.start();
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Unable to access microphone.");
    }
  };

  const stopRecording = () => {
    console.log("stopRecording called");
    mediaRecorderRef.current?.stop();
  };

  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl("");
  };

  return {
    isRecording,
    isPaused,
    audioUrl,
    recordingTime,
    uploadedAudio,
    // transcript,

    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    deleteRecording,
  };
}
