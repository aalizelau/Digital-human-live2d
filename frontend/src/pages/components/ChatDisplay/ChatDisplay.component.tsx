import React from "react";
import styles from "@/styles/ChatDisplay.module.css"; // Add custom styling if needed

// Define props interface
interface ChatDataProps {
    chatData: {
      userQuery: string;
      aiResponseText: string;
    };
  }

  const ChatDisplay: React.FC<ChatDataProps> = ({ chatData }) => {
  return (
    <div className={styles["chat-display"]}>
      <div className={styles["chat-message"]}>
        <strong>User:</strong>
        <p>{chatData.userQuery}</p>
      </div>
      <div className={styles["chat-message"]}>
        <strong>AI:</strong>
        <p>{chatData.aiResponseText}</p>
      </div>
    </div>
  );
};

export default ChatDisplay;