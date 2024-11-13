import React from "react";
import styles from "@/styles/ChatDisplay.module.css"; // Add custom styling if needed

// Define props interface
// Define the ChatMessage interface
interface ChatMessage {
    userQuery: string;
    aiResponseText: string;
  }
  
  // Define props interface
  interface ChatDataProps {
    chatData: ChatMessage[];
  }

const ChatDisplay: React.FC<ChatDataProps> = ({ chatData }) => {
    return (
        <div className={styles["chat-display"]}>
        {chatData.map((message, index) => (
            <div key={index} className={styles["chat-message"]}>
            <div className={styles["user-message"]}>
                <strong>User:</strong>
                <p>{message.userQuery}</p>
            </div>
            <div className={styles["ai-message"]}>
                <strong>AI:</strong>
                <p>{message.aiResponseText}</p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default ChatDisplay;