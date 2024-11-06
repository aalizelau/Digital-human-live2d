from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def convert_audio_to_text(local_input_file_path):
    audio_file= open(local_input_file_path, "rb")
    transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
    )
    print(transcription.text)
    return transcription.text

# transcription_result = convert_audio_to_text("/Users/funlau/Documents/ChatCampus/backend/testing.m4a")
# transcription_result = convert_audio_to_text("/Users/funlau/Documents/ChatCampus/backend/cantonese_testng.m4a")