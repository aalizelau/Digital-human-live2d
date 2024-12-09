from google.cloud import speech
import os

def convert_audio_to_text(audio_bytes, language) -> speech.RecognizeResponse:
    # Instantiates a client
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_bytes)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code=language,
    )
    
    # Detects speech in the audio file
    try:
        # Detects speech in the audio file
        response = client.recognize(config=config, audio=audio)

        # Concatenate all results into a single string
        transcript = " ".join(result.alternatives[0].transcript for result in response.results)
        return transcript
    except Exception as e:
        print(f"Error during recognition: {e}")
        return None

# testing audio 
# if __name__ == "__main__":
#     with open("/Users/funlau/Documents/ChatCampus/backend/audio/Eng_test_input_2.mp3", "rb") as f:
#         mp3_data = f.read()
#     convert_audio_to_text(mp3_data) 