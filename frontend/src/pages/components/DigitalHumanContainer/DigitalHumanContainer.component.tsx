"use client";

import { useContext,useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import VoiceAssistantContext from '../../context/VoiceAssistantContext';
import VoiceAssistantAvatar from '../VoiceAssistantAvatar/VoiceAssistantAvatar.component';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder.component';
import AudioPlayer from '../AudioPlayer/AudioPlayer.component';
import ReactLoading from 'react-loading';

// import * as PIXI from 'pixi.js';
// import { Live2DModel } from 'pixi-live2d-display';

// Dynamically load PIXI.js and Live2D model
const loadPixi = async () => {
  const PIXI = (await import('pixi.js'));
  const { Live2DModel } = await import('pixi-live2d-display');
  return { PIXI, Live2DModel };
};

// Extend the global window object to include PIXI
declare global {
  interface Window {
    PIXI: typeof import('pixi.js');
  }
}

const DigitalHumanContainer =() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Initialize with null
  
  // Run initialization logic after the component mounts
  useEffect(() => {
    const initializePixi = async () => {
      try {
        // Dynamically load libraries
        const { PIXI, Live2DModel } = await loadPixi();
        console.log("PIXI loaded:", PIXI);
        console.log("Live2DModel loaded:", Live2DModel);

        // Expose PIXI globally
        window.PIXI = PIXI
        // Register the Live2D model with the PIXI ticker
        Live2DModel.registerTicker(PIXI.Ticker);
        
        // Access the canvas element
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas not found");
          return;
        }

        // Create a PIXI application
        const app = new PIXI.Application({
          view: canvas, // Link PIXI to the canvas
          height: 1000,
          width: 700,
          autoDensity: true,
          antialias: true,
          resolution: window.devicePixelRatio,
          transparent:true,
        });

        // Load the Live2D model
        // const url = "http://localhost:3000/shizuku_model/shizuku.model.json";
        const url = `${window.location.origin}/shizuku_model/shizuku.model.json`
        const model = await Live2DModel.from(url);
        
        // Add the model to the PIXI stage
        app.stage.addChild(model);
        model.scale.set(0.5);
        model.position.set(0, -5);
      } catch (error) {
        console.error("Failed to initialize PIXI or load Live2D model:", error);
      }
    };
  
    initializePixi();
  }, []);

  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = useContext(VoiceAssistantContext);

  return (
    <div className="md:col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-xl border border-purple-500 p-6">
      <canvas ref={canvasRef}> </canvas>
      <div className="w-48 h-48 md:w-80 md:h-80 rounded-full mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 animate-pulse"></div>
        <VoiceAssistantAvatar />
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