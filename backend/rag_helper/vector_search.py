from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
import os
from langchain_chroma import Chroma
from chromadb.config import Settings
import chromadb


def get_context():
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    chroma_host = os.getenv("CHROMA_HOST")
    chroma_client_auth_credentials = os.getenv("CHROMA_AUTH_CREDENTIALS")
    chroma_auth_token_transport_header = os.getenv("CHROMA_AUTH_HEADER")


    # chroma_client = chromadb.HttpClient(host='localhost', port=8000)
    chroma_client = chromadb.HttpClient(
        host=chroma_host,
        port=443,
        ssl=True,
        settings=Settings(
            chroma_client_auth_provider="chromadb.auth.token_authn.TokenAuthClientProvider",
            chroma_client_auth_credentials=chroma_client_auth_credentials,
            chroma_auth_token_transport_header=chroma_auth_token_transport_header
        )
    )

    db = Chroma(
    client=chroma_client,
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