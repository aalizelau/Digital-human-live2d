import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';

import VoiceAssistantAvatar from '../VoiceAssistantAvatar/VoiceAssistantAvatar.component';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder.component';
import AudioPlayer from '../AudioPlayer/AudioPlayer.component';
import ReactLoading from 'react-loading';

const DigitalHumanContainer = () => {
  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = useContext(VoiceAssistantContext);

  return (
    <div className="md:col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-xl border border-purple-500 p-6">
      <div
        className="w-48 h-48 md:w-80 md:h-80 rounded-full mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 animate-pulse"></div>
        <VoiceAssistantAvatar />
      </div>
      <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
      {isWaitingAIOutput && (
        <ReactLoading type="bars" color="#4287f5" width={200} />
      )}
      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
    </div>
  );
};

export default DigitalHumanContainer;