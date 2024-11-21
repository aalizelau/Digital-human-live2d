import os 
from gtts import gTTS

def convert_text_to_audio(text, language, filename="response_output.mp3"):
    print("Converting response to speech...")

    script_dir = os.path.dirname(__file__)
    backend_dir = os.path.abspath(os.path.join(script_dir, ".."))
    audio_folder = os.path.join(backend_dir, "audio")
    os.makedirs(audio_folder, exist_ok=True)
    audio_file_path = os.path.join(audio_folder, filename)

    # Generate and save the audio file
    tts = gTTS(text=text, lang=language)
    tts.save(audio_file_path)
    print(f"Audio saved as {audio_file_path}")
    return audio_file_path
    
# if __name__ == "__main__":
#     # test_text = "Hello, this is a test of the text-to-speech functionality!"
#     text = "妳好，這是一個中文語言的測試"
#     language= "zh-CN"
#     output_filename = convert_text_to_audio(text,language)
    
#     # Check if the file was created
#     if os.path.exists(output_filename):
#         print("Test passed: Audio file created successfully.")
#     else:
#         print("Test failed: Audio file was not created.")