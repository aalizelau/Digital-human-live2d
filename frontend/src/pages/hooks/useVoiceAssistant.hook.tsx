"use client";

import { getTextFromAudio, getAIAudioFromText, getAIReplyFromText } from "@/pages/services/aivoiceassistant.service"
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
      try{
        const userTextResult = await getTextFromAudio(userAudioData);
        if (!userTextResult) return;
        const { userQuery } = userTextResult;
        setChatData((prevData) => [...prevData, { text: userQuery, isUser: true }]);

        setIsWaitingAIOutput(true);
        let aiResponseText = '';
        try {
          const result = await getAIReplyFromText(userQuery);
          if (result) {
            aiResponseText = result.aiResponseText;
            setChatData((prevData) => [...prevData, { text: aiResponseText, isUser: false }]);
          }
        } catch (aiReplyError) {
          console.error("Error getting AI reply:", aiReplyError);
        } finally {
          setIsWaitingAIOutput(false); 
        }
    
        // Convert AI text reply to audio
        if (aiResponseText) {
          try {
            const aiAudioResult = await getAIAudioFromText(aiResponseText, selectedLanguage);
            if (aiAudioResult) {
              const url = URL.createObjectURL(aiAudioResult);
              setLastAIReplyURL(url);
            }
          } catch (aiAudioError) {
            console.error("Error generating AI audio:", aiAudioError);
          }
        }
      } catch (error) {
        console.error("Error handling user voice input:", error);
        setIsWaitingAIOutput(false); // Reset waiting state on failure
      }
    };

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