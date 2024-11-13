import { getAIReplyOutput } from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"

const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [chatData, setChatData] = useState<Array<{ userQuery: string; aiResponseText: string }>>([]);

    const handleUserVoiceRecorded = async (userAudioData: Blob) => {
        setIsWaitingAIOutput(true);
        const result = await getAIReplyOutput(userAudioData, selectedLanguage);
        setIsWaitingAIOutput(false);
        if (result) {
          const { transcriptionText, userQuery, base64AudioData } = result;
          const newMessage = {
            userQuery,
            aiResponseText: transcriptionText,
          };
          setChatData((prevData) => [...prevData, newMessage]);
          const audioData = 'data:audio/mpeg;base64,' + base64AudioData;
          setLastAIReplyURL(audioData);
        }
    }

    const handleOnAudioPlayEnd = ()=>{
        setLastAIReplyURL(undefined)
    }

    const handleLanguageChange = (language:string) => {
        setSelectedLanguage(language);
    };

    return{
        handleUserVoiceRecorded,
        isWaitingAIOutput,
        lastAIReplyURL,
        handleOnAudioPlayEnd,
        selectedLanguage,
        handleLanguageChange,
        chatData,
    }
}


export default useVoiceAssistant;