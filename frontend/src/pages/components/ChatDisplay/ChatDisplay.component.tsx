"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area" // Adjust import paths as necessary


interface ChatMessage {
  text: string;
  isUser: boolean;
}
interface ChatDisplayProps {
  chatData: ChatMessage[];
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ chatData }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollAreaRef.current) {
  //     requestAnimationFrame(() => {
  //       scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
  //     });
  //   }
  // }, [chatData]);
  
  return (
    <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
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
                ? 'bg-blue-900 bg-opacity-50 text-blue-100 ml-4'
                : 'bg-purple-900 bg-opacity-50 text-purple-100 mr-4'
            }`}
          >
            <strong>{message.isUser ? 'You: ' : 'NeoLearn AI: '}</strong>
            <p>{message.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollArea>
  );
};

export default ChatDisplay;