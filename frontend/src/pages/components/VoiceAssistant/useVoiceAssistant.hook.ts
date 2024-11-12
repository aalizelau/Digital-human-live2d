import { getAIReplyOutput } from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"


const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

    const handleUserVoiceRecorded = async(userAudioData:Blob)=>{
        setIsWaitingAIOutput(true)
        const result = await getAIReplyOutput(userAudioData)
        setIsWaitingAIOutput(false)
        if(result){
            const url = URL.createObjectURL(result)
            setLastAIReplyURL(url)
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