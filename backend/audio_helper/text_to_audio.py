import os 
from gtts import gTTS

def convert_text_to_audio(text, filename="response.mp3"):
    print("Converting response to speech...")
    tts = gTTS(text=text, lang='zh-CN')
    tts.save(filename)
    print(f"Audio saved as {filename}")
    return filename
    
# if __name__ == "__main__":
#     # test_text = "Hello, this is a test of the text-to-speech functionality!"
#     test_text_CN = "妳好，這是一個中文語言的測試"
#     output_filename = convert_text_to_audio(test_text_CN)
    
#     # Check if the file was created
#     if os.path.exists(output_filename):
#         print("Test passed: Audio file created successfully.")
#     else:
#         print("Test failed: Audio file was not created.")