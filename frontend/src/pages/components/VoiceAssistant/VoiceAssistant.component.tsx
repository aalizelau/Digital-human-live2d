import VoiceAssistantAvatar from "./VoiceAssistantAvatar/VoiceAssistantAvatar.component"
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder.component"
import styles from "@/styles/VoiceAssistant.module.css";
import useVoiceAssistant from "./useVoiceAssistant.hook";
import ReactLoading from "react-loading";
import AudioPlayer from "../AudioPlayer/AudioPlayer.component";
import LanguageSelector from '../LanguageSelector/LanguageSelector.component';
import ChatDisplay from '../ChatDisplay/ChatDisplay.component';

const VoiceAssistant = ()=>{
    const {
        handleUserVoiceRecorded,
        isWaitingAIOutput,
        lastAIReplyURL,
        handleOnAudioPlayEnd,
        selectedLanguage,
        handleLanguageChange,
        chatData,
        handleChatDataChange,
    } = useVoiceAssistant()

    return (
        <div className={styles["voice-assistant-component"]}>
            <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
            />
            <VoiceAssistantAvatar/>
            <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded}/>
            {isWaitingAIOutput &&  
                (<ReactLoading type={"bars"} color={"#4287f5"} width={200} />)
            }
            <ChatDisplay chatData={chatData} />

            <AudioPlayer audioFileUrl={lastAIReplyURL} onAudioPlayEnd={handleOnAudioPlayEnd}/>
        </div>
    )
}


export default VoiceAssistant