"use client";

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';

import ChatDisplay from '../ChatDisplay/ChatDisplay.component';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder.component';
import AudioPlayer from '../AudioPlayer/AudioPlayer.component';
import Loading from '../Loading/Loading.component'

export default function ConversationContainer() {
  const context = useContext(VoiceAssistantContext);
  if (!context) {
    throw new Error(
      'VoiceAssistantContext is undefined. Did you forget to wrap the component with VoiceAssistantProvider?'
    );
  }

  const {
    inputText,
    chatData,
    handleTextSubmit,
    setInputText,
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = context;

  return (
    <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg border border-white border-opacity-20 p-4 flex flex-col h-[calc(100vh-7rem)]">
      <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 flex items-center">
        <MessageCircle className="w-8 h-8 mr-2 text-orange-400" />
        Conversation Dialog
      </h2>
      <ChatDisplay chatData={chatData} />
      {isWaitingAIOutput && (
        <Loading/>
      )}
      <form onSubmit={handleTextSubmit} className="flex items-center space-x-2 mt-4">
        <div className="relative flex-1"> 
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full text-lg bg-transparent border border-red-500 border-opacity-50 text-gray-800 placeholder-gray-500 rounded-full px-4 py-2 pr-12"
            aria-label="Message input"
          />
          <Button
            type="submit"
            className="absolute inset-y-0 right-2 text-orange-500 hover:text-orange-300 rounded-full p-2 flex items-center justify-center"
            aria-label="Send message"
            variant= "ghost"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded}/>
      </form>
      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
    </div>
  );
}