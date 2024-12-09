from google.cloud import texttospeech
import os
import base64
from dotenv import load_dotenv

def convert_text_to_audio(text, language, filename="response_output.mp3"):
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

    script_dir = os.path.dirname(__file__)
    backend_dir = os.path.abspath(os.path.join(script_dir, ".."))
    audio_folder = os.path.join(backend_dir, "audio")
    os.makedirs(audio_folder, exist_ok=True)
    audio_file_path = os.path.join(audio_folder, filename)

    client = texttospeech.TextToSpeechClient()
    synthesis_input = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code=language, ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # The response's audio_content is binary.
    with open(audio_file_path, "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file')
    
    return audio_file_path

# if __name__ == "__main__":
#     text = "妳好，這是一個中文語言的測試"
#     language= "cmn-CN"
#     output_filename = convert_text_to_audio(text,language)

# if __name__ == "__main__":
#     text = "妳好，這是一個廣東話語言的測試"
#     language= "Yue-HK"
#     output_filename = convert_text_to_audio(text,language)