import asyncio
import sys
import os 

# Add the backend directory to the Python module search path
script_dir = os.path.dirname(__file__)
backend_dir = os.path.abspath(os.path.join(script_dir, '..'))
sys.path.append(backend_dir)

from audio_helper.google_stt import convert_audio_to_text
from audio_helper.cloud_tts import convert_text_to_audio

from rag_helper.llm_response import get_response_from_llm
from rag_helper.vector_search import get_context
from rag_helper.llm_test import llm_test

from data_helper.pdf_loader import load_documents
from data_helper.split_text import get_text_chunks
from data_helper.process_chunk import get_processed_chunks
from data_helper.add_chunk import add_data_to_vector_store

async def test_wrapper(input_text):
    return llm_test(input_text)

async def handle_audio_from_user(audio_file: bytes, language:str) -> str:
    print("handle audio from user")
    user_query = convert_audio_to_text(audio_file, language)
    print("transcription: ", user_query)
    return user_query

async def generate_audio(text, language) -> str:
    output_audio_local_file_path = convert_text_to_audio(text, language)
    return output_audio_local_file_path

async def handle_text_from_user(user_input: str) -> str:
    print("handle text from user")
    retriever = get_context()
    docs = retriever.invoke(user_input)
    print("Retrieved Document IDs:")
    for doc in docs:
        print(doc.metadata.get("ids"))
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

# test audio response
# user_query="best advice you could give"
# language = "en"
# asyncio.run(generate_ai_response_audio(user_query, language))

# testing text input 
# if __name__ == "__main__":
#     text_input = "any research about how fake news spread?"
#     asyncio.run(handle_text_from_user(text_input))

# asyncio.run(test_wrapper("I love you"))

# asyncio.run(data_pipeline())

