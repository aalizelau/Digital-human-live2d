import React, { useState, useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';
import ChatDisplay from '../ChatDisplay/ChatDisplay.component';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ConversationContainer = () => {
  const { chatData, addMessage } = useContext(VoiceAssistantContext);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    // Add the user's message to the context
    addMessage({ text: inputText, isUser: true });

    // Clear the input field
    setInputText('');
  };

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-xl border border-purple-500 p-6 flex flex-col h-[calc(100vh-10rem)]">
      <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 flex items-center">
        <MessageCircle className="w-8 h-8 mr-2 text-blue-400" />
        Quantum Dialog
      </h2>
      <ChatDisplay chatData={chatData} />
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow text-lg bg-black bg-opacity-50 border border-purple-500 text-white placeholder-purple-300 rounded-full px-4 py-2"
          aria-label="Message input"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ConversationContainer;