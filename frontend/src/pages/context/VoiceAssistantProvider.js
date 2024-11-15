import useVoiceAssistant from '../hooks/useVoiceAssistant.hook';

const VoiceAssistantProvider = ({ children }) => {
  const voiceAssistantState = useVoiceAssistant();

  return (
    <VoiceAssistantContext.Provider value={voiceAssistantState}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export default VoiceAssistantProvider;