from google.cloud import speech
import os
import base64
from dotenv import load_dotenv

def convert_audio_to_text(audio_bytes) -> speech.RecognizeResponse:
    load_dotenv()
    encoded_key = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_BASE64")
    decoded_key = base64.b64decode(encoded_key).decode("utf-8")

    # Write the decoded JSON to a temporary file
    temp_dir = "./tmp"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    temp_credentials_path = os.path.join(temp_dir, "service-account-key.json")
    with open(temp_credentials_path, "w") as temp_file:
        temp_file.write(decoded_key)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_credentials_path

    # Instantiates a client
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_bytes)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
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