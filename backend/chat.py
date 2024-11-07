from langchain.llms import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

llm = OpenAI(openai_api_key=openai_api_key, temperature=0.5)
prompt = "What are the benefits of using LangChain with OpenAI?"
response = llm(prompt)
print(response)