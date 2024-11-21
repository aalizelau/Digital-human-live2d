const BASE_URL = "https://chatcampus-production.up.railway.app"

export const getAIReplyFromAudio = async (userAudioData: Blob, selectedLanguage: string) => {
    const audioFile = new File([userAudioData], "userVoiceInput", {
      type: "audio/mpeg",
    });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("language", selectedLanguage);
  
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const result = await fetch(`${BASE_URL}/voice-assistant/audio-message`, requestOptions);
      // Parse the JSON response
      const data = await result.json();
      const transcriptionText = data.transcription_text;
      const userQuery = data.user_query;
      const base64AudioData = data.audio_data;
      return {
        transcriptionText,
        userQuery,
        base64AudioData,
      };

    } catch (error) {
      console.error("Error handling user voice data >> ", error);
    }
  };

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