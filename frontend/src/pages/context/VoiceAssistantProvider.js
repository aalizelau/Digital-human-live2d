"use client";

import useVoiceAssistant from '../hooks/useVoiceAssistant.hook'
import VoiceAssistantContext from './VoiceAssistantContext'

const VoiceAssistantProvider = ({ children }) => {
  const voiceAssistantState = useVoiceAssistant();

  return (
    <VoiceAssistantContext.Provider value={voiceAssistantState}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export default VoiceAssistantProvider;