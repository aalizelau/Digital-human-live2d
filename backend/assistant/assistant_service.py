import asyncio
import os 

from utils.file_utils import persist_binary_file_locally, create_unique_tmp_file
from audio_helper import convert_file_to_readable_mp3
from audio_helper import convert_audio_to_text
from audio_helper import convert_text_to_audio

from rag_helper import get_response_from_llm
from rag_helper import load_documents
from rag_helper import get_text_chunks
from rag_helper import get_context

def __get_transcoded_audio_file_path(data: bytes) -> str:
    local_file_path = persist_binary_file_locally(data, file_suffix='user_audio.mp3')
    local_output_file_path = create_unique_tmp_file(file_suffix='transcoded_user_audio.mp3')
    try:
        convert_file_to_readable_mp3(
            local_input_file_path=local_file_path,
            local_output_file_path=local_output_file_path
        )
    finally:
        if os.path.exists(local_file_path):
            os.remove(local_file_path)
    if not os.path.exists(local_output_file_path):
        raise FileNotFoundError(f"Transcoded file not created: {local_output_file_path}")
    return local_output_file_path


async def handle_audio_from_user(file: bytes) -> str:
    print("handle audio from user")
    transcoded_user_audio_file_path = __get_transcoded_audio_file_path(file)
    try:
        user_query = convert_audio_to_text(transcoded_user_audio_file_path)
    finally:
        if os.path.exists(transcoded_user_audio_file_path):
            os.remove(transcoded_user_audio_file_path)
    return user_query

async def generate_ai_response_audio(user_query, language) -> str:
    extracted_documents = load_documents()
    chunks = get_text_chunks(extracted_documents)
    retrieved_text = get_context(chunks)
    print("retrieved_text: ", retrieved_text)
    llm_response = get_response_from_llm(retrieved_text,user_query)
    print("ai_text_reply: ", llm_response)
    output_audio_local_file_path = convert_text_to_audio(llm_response, language)
    return output_audio_local_file_path, llm_response

async def handle_text_from_user(user_input: str) -> str:
    print("handle text from user")
    extracted_text = load_documents()
    chunks = get_text_chunks(extracted_text)
    retrieved_text = get_context(chunks)
    print("retrieved_text: ", retrieved_text)
    llm_response = get_response_from_llm(retrieved_text,user_input)
    print("ai_text_reply: ", llm_response)
    return llm_response

# testing audio 
# if __name__ == "__main__":
#     with open("/Users/funlau/Documents/ChatCampus/backend/audio/CN_test_input.m4a", "rb") as f:
#         mp3_data = f.read()

#     # Running the async function in synchronous context for testing
#     asyncio.run(handle_audio_from_user(mp3_data,"zh-CN"))

# testing text input 
# if __name__ == "__main__":
#     text_input = "what is fake news?"
#     asyncio.run(handle_text_from_user(text_input))

