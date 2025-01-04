"use client";

import React, { useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export interface VoiceRecorderProps {
  onAudioRecordingComplete: (audioData: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onAudioRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const handleRecordToggle = async () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
          chunksRef.current = []; // Clear chunks for the next recording
          onAudioRecordingComplete(audioBlob);
        };

        mediaRecorderRef.current.start();
        console.log("Recording started");
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setIsRecording(false);
      }
    } else {
      // Stop recording
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
      console.log("Recording stopped");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleRecordToggle}
        className={`rounded-full p-2 mr-1 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        <span className="sr-only">{isRecording ? "Stop Listening" : "Start Listening"}</span>
      </button>
    </div>
  );
};

export default VoiceRecorder;