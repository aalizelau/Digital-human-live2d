"use client";

import { useEffect, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';

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
  const {
  mouthOpen
} = useContext(VoiceAssistantContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Initialize with null
  const modelRef = useRef<any>(null);
  
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
          height: 700,
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
        model.position.set(30, -30);

        // Store the model in the ref
        modelRef.current = model;
        
      } catch (error) {
        console.error("Failed to initialize PIXI or load Live2D model:", error);
      }
    };
  
    initializePixi();
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.internalModel.coreModel.setParamFloat("PARAM_MOUTH_OPEN_Y", mouthOpen);
    }
  }, [mouthOpen]); // trigger when there is an update of mouthOpen

  return (
    <div className="md:col-span-2 flex flex-col items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg border border-white border-opacity-20 p-6 h-[calc(100vh-7rem)] overflow-hidden">
      <canvas ref={canvasRef}> </canvas>
    </div>
  );
};

export default DigitalHumanContainer;