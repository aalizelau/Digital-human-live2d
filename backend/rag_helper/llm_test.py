
from dotenv import load_dotenv
import os

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

def llm_test(input_text):
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")

    model = ChatOpenAI(model="gpt-4o-mini")

    messages = [
        SystemMessage("Translate the following from English into Italian"),
        HumanMessage(input_text),
    ]

    answer = model.invoke(messages)
    return answer