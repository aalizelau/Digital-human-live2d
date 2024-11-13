export const getAIReplyOutput = async (userAudioData: Blob, selectedLanguage: string) => {
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
      const result = await fetch(
        "http://localhost:8000/voice-assistant/audio-message",
        requestOptions
      );
      // Parse the JSON response
      const data = await result.json();
      const transcriptionText = data.transcription_text;
      const base64AudioData = data.audio_data;
      return {
        transcriptionText,
        base64AudioData,
      };

    } catch (error) {
      console.error("Error handling user voice data >> ", error);
    }
  };