import React, { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';
import ChatDisplay from '../ChatDisplay/ChatDisplay.component';

const ConversationContainer = () => {
  const { chatData } = useContext(VoiceAssistantContext);

  return (
    <div className="conversation-container">
      <ChatDisplay chatData={chatData} />
    </div>
  );
};

export default ConversationContainer;