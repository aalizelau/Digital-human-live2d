from langchain.llms import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

def handle_get_response_for_user(user_prompt: str) -> str:

    llm = OpenAI(openai_api_key=openai_api_key, temperature=0.5)
    response = llm(user_prompt)
    print(response)
    return response