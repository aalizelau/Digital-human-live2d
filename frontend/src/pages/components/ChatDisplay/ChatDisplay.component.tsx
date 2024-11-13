import React from "react";
import styles from "@/styles/ChatDisplay.module.css"; // Add custom styling if needed

// Define props interface
interface ChatDataProps {
    chatData: {
      userQuery: string;
      aiResponse: string;
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
        <p>{chatData.aiResponse}</p>
      </div>
    </div>
  );
};

export default ChatDisplay;