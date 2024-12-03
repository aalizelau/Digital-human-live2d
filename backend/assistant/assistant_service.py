import asyncio
import sys
import os 

# Add the backend directory to the Python module search path
script_dir = os.path.dirname(__file__)
backend_dir = os.path.abspath(os.path.join(script_dir, '..'))
sys.path.append(backend_dir)

from utils.file_utils import persist_binary_file_locally, create_unique_tmp_file
from audio_helper import convert_file_to_readable_mp3
from audio_helper import convert_audio_to_text
from audio_helper import convert_text_to_audio

from rag_helper.llm_response import get_response_from_llm
from rag_helper.vector_search import get_context
from rag_helper.llm_test import llm_test

from data_helper.pdf_loader import load_documents
from data_helper.split_text import get_text_chunks
from data_helper.process_chunk import get_processed_chunks
from data_helper.add_chunk import add_data_to_vector_store

async def test_wrapper(input_text):
    return llm_test(input_text)

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
    retriever = get_context()
    llm_response = get_response_from_llm(retriever,user_query)
    print("ai_text_reply: ", llm_response)
    output_audio_local_file_path = convert_text_to_audio(llm_response, language)
    return output_audio_local_file_path, llm_response

async def handle_text_from_user(user_input: str) -> str:
    print("handle text from user")
    retriever = get_context()
    llm_response = get_response_from_llm(retriever,user_input)
    print("ai_text_reply: ", llm_response)
    return llm_response

async def data_pipeline():
    print("data pipeline start")
    extracted_documents = load_documents()
    chunks = get_text_chunks(extracted_documents)
    chunks_with_ids= get_processed_chunks(chunks)
    add_data_to_vector_store(chunks_with_ids)
    print("data pipeline done")

# testing audio 
# if __name__ == "__main__":
#     with open("/Users/funlau/Documents/ChatCampus/backend/audio/CN_test_input.m4a", "rb") as f:
#         mp3_data = f.read()

#     # Running the async function in synchronous context for testing
#     asyncio.run(handle_audio_from_user(mp3_data,"zh-CN"))

# test audio response
# user_query="best advice you could give"
# language = "en"
# asyncio.run(generate_ai_response_audio(user_query, language))

# testing text input 
# if __name__ == "__main__":
#     text_input = "any research?"
#     asyncio.run(handle_text_from_user(text_input))

# asyncio.run(test_wrapper("I love you"))

# asyncio.run(data_pipeline())

