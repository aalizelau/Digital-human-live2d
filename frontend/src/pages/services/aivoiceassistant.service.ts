"use client";

//backend API
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export const getTextFromAudio = async (userAudioData: Blob, selectedLanguage: string) => {
  const audioFile = new File([userAudioData], "userVoiceInput", {
    type: "audio/mpeg",
  });
  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("language", selectedLanguage)

  const requestOptions = {
    method: "POST",
    body: formData,
  };
  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/stt`, requestOptions);
    // Parse the JSON response
    const data = await result.json();
    return {
      userQuery: data.user_query,
    };
  } catch (error) {
    console.error("Error handling user voice data >> ", error);
  }
};

export const getAIAudioFromText = async (ai_response_text: string, selectedLanguage: string) => {
  const formData = new FormData();
  formData.append("language", selectedLanguage)
  formData.append("text", ai_response_text )

  const requestOptions = {
    method: "POST",
    body: formData,
  };
  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/tts`, requestOptions);
    return await result.blob()
  } catch (error) {
    console.error("Error handling user query and return audio >> ", error);
  }
}

export const getAIReplyFromText = async (textInput: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textInput),
  };

  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/text-message`, requestOptions);
    const data = await result.json();
    return {
      aiResponseText: data.response,
    };
  } catch (error) {
    console.error("Error handling user text data >> ", error);
  }
};

export default getAIReplyFromText;