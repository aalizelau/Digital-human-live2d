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

    #test
    # results = db.similarity_search(query="machine learning",k=1)
    # print(results)

    retriever = db.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2},
    )

    return retriever

#test
# get_context()