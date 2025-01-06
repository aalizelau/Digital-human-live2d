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
        className={`rounded-full px-4 py-2 ${
          isRecording
            ? "bg-red-400 hover:bg-red-500 text-white"
            : "bg-orange-400 hover:bg-orange-500 text-white"
        }`}
      >
        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        <span className="sr-only">{isRecording ? "Stop Listening" : "Start Listening"}</span>
      </button>
    </div>
  );
};

export default VoiceRecorder;