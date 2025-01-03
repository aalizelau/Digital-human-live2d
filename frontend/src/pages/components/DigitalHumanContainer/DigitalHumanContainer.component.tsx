"use client";

import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';
import { useRouter } from 'next/router';


import VoiceAssistantAvatar from '../VoiceAssistantAvatar/VoiceAssistantAvatar.component';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder.component';
import AudioPlayer from '../AudioPlayer/AudioPlayer.component';
import ReactLoading from 'react-loading';

import { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

declare global {
  interface Window {
    PIXI: typeof import('pixi.js');
  }
}

let model;
window.PIXI = PIXI;

const DigitalHumanContainer =() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Initialize with null

  useEffect(() => {
    const setupModel = async () => {
      const canvas = canvasRef.current; // Access the current canvas
      if (!canvas) {
        console.error("Canvas not found");
        return; // Exit if canvas is still null
      }
      const app = new PIXI.Application({
        view: canvas, // Use the actual canvas element
        height: 1000,
        width: 700,
        autoDensity: true,
        antialias: true,
        // resolution: window.devicePixelRatio,
      });
      try {
        // Load the Live2D model
        const url = "http://localhost:3000/model3/shizuku.model.json"
        // const url = `${window.location.origin}/shizuku_model/shizuku.model.json`
        const model = await Live2DModel.from(
          url
        );
        // Add the model to the PIXI stage
        app.stage.addChild(model);
        model.scale.set(0.5);
        model.position.set(-75, -50);
      } catch (error) {
        console.error("Failed to load Live2D model:", error);
      }
    };   
    setupModel();
  }, []);

  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = useContext(VoiceAssistantContext);

  const router = useRouter();
    if (!router.isFallback && !handleUserVoiceRecorded ) {
      return <p>Post not found</p>;
    }

  return (
    <div className="md:col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-xl border border-purple-500 p-6">
      <div className="w-48 h-48 md:w-80 md:h-80 rounded-full mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 animate-pulse"></div>
        <VoiceAssistantAvatar />
        <canvas ref={canvasRef}> </canvas>
      </div>
      <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
      {isWaitingAIOutput && (
        <ReactLoading type="bars" color="#4287f5" width={200} />
      )}
      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
    </div>
  );
};

export default DigitalHumanContainer;