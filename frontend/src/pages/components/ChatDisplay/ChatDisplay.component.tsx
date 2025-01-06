"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area" 
import { useRouter } from 'next/router';


interface ChatMessage {
  text: string;
  isUser: boolean;
}
interface ChatDisplayProps {
  chatData: ChatMessage[];
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ chatData }) => {
  // Ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView(false);
    }
  };
  // Scroll on component mount (initial load)
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Scroll whenever new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  
  return (
    <ScrollArea className="flex-grow mb-4 pr-4">
        <AnimatePresence initial={false}>
          {chatData.map((message,index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-3 p-3 rounded-lg ${
                message.isUser
                  ? 'bg-yellow-100 bg-opacity-50 text-yellow-800 ml-4'
                  : 'bg-orange-100 bg-opacity-50 text-orange-800 mr-4'
              }`}
            >
              <strong>{message.isUser ? 'You: ' : 'Campus AI: '}</strong>
              <p>{message.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      {/* Scroll anchor */}
      <div ref={chatContainerRef}></div>
    </ScrollArea>
  );
};

export default ChatDisplay;