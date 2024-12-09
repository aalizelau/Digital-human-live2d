from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
import os
from langchain_chroma import Chroma


def get_context():
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    PERSIST_DIRECTORY = "./chroma"
    db = Chroma(
    persist_directory=PERSIST_DIRECTORY,
	collection_name="campusAI",
	embedding_function = OpenAIEmbeddings()
    )

    retriever = db.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2},
    )
    # docs = retriever.invoke(query="machine learning")
    # print(docs)
    return retriever

#test
# get_context()