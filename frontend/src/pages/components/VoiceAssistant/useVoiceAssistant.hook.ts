import { getAIReplyOutput } from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"


const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [transcriptionText, setTranscriptionText] = useState('');

    const handleUserVoiceRecorded = async(userAudioData:Blob)=>{
        setIsWaitingAIOutput(true)
        const result = await getAIReplyOutput(userAudioData, selectedLanguage)
        setIsWaitingAIOutput(false)
        if(result){
            const { transcriptionText, base64AudioData } = result;
            setTranscriptionText(transcriptionText);
            const audioData = 'data:audio/mpeg;base64,' + base64AudioData;
            setLastAIReplyURL(audioData)
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
    }
}


export default useVoiceAssistant