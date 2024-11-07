import requests  
import json  
import os
from dotenv import load_dotenv

load_dotenv()
XI_API_KEY = os.getenv("XI_API_KEY")

VOICE_ID = "iP95p4xoKVk53GoZ742B"
tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/stream"

def convert_text_to_audio(text_content: str):
    headers = {
        "Accept": "application/json",
        "xi-api-key": XI_API_KEY
    }
    data = {
        "text": text_content,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.8,
            "style": 0.0,
            "use_speaker_boost": True
        }
    }
    response = requests.post(tts_url, headers=headers, json=data, stream=True)

    if response.status_code == 200:
        # Collect the audio content from the response
        audio_data = b"".join(chunk for chunk in response.iter_content(chunk_size=1024) if chunk)
        return audio_data  # Return the audio data as bytes
    else:
        raise Exception(f"Error: {response.status_code}, {response.text}")
    
# Testing the function
# if __name__ == "__main__":
#     test_text = "Hello, this is a test of the Eleven Labs text-to-speech API!"
#     try:
#         audio_data = convert_text_to_audio(test_text)
        
#         # Save the audio data to an mp3 file
#         with open("test_output.mp3", "wb") as audio_file:
#             audio_file.write(audio_data)
        
#         print("Audio saved as test_output.mp3")

#     except Exception as e:
#         print("Error during TTS conversion:", e)