import { getAIReplyFromAudio, getAIReplyFromText } from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"

interface Message {
    text: string;
    isUser: boolean;
  }

const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [chatData, setChatData] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');

  const handleUserInput = async (input: string) => {
    setChatData((prev) => [...prev, { text: input, isUser: true }]);
    setIsWaitingAIOutput(true);
        const result = await getAIReplyFromText(input);
    setIsWaitingAIOutput(false);
    if (result) {
        const { aiResponseText } = result;
        setChatData((prevData) => [...prevData, {text: aiResponseText, isUser: false}]);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserInput(inputText);
      setInputText('');
    }
  };

    const handleUserVoiceRecorded = async (userAudioData: Blob) => {
        setIsWaitingAIOutput(true);
        const result = await getAIReplyFromAudio(userAudioData, selectedLanguage);
        setIsWaitingAIOutput(false);
        if (result) {
          const { transcriptionText, userQuery, base64AudioData } = result;
          setChatData((prevData) => [...prevData, {text: transcriptionText, isUser: true}]);
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
        inputText,
        setInputText,
        handleTextSubmit,
    }
}


export default useVoiceAssistant;