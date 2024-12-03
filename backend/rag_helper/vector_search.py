from langchain_core.documents import Document
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

    retriever = db.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2},
    )

    return retriever

    # find existing ids
    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"]) 
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    # add chunks to array if not in existing ids
    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["ids"] not in existing_ids:
            new_chunks.append(chunk) 
    print(f"Number of new documents being added: {len(new_chunks)}")

    if not new_chunks:
        print("No new documents to add. Skipping database update.")
    else:
        # add the array to DB  		
        new_chunk_ids = [chunk.metadata["ids"] for chunk in new_chunks]
        db.add_documents(new_chunks, ids = new_chunk_ids)

    #vector search
    retriever = db.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2},
    )
    return retriever

    #vector search test
    # results = db.similarity_search(query="machine learning",k=1)
    # print(results)

# if __name__ == "__main__":
#     chunks_with_ids = [
#         Document(
#             page_content="The Eiffel Tower is one of the most iconic landmarks in Paris, France. It was completed in 1889.",
#             metadata={"ids": "doc1:page1:chunk0"}
#         ),
#         Document(
#             page_content="Python is a popular programming language known for its simplicity and readability. It is widely used in web development, data science, and machine learning.",
#             metadata={"ids": "doc1:page1:chunk1"}
#         ),
#         Document(
#             page_content="The Great Barrier Reef is the world's largest coral reef system, located off the coast of Queensland, Australia. It is home to diverse marine life.",
#             metadata={"ids": "doc2:page2:chunk0"}
#         ),
#         Document(
#             page_content="Basketball is a team sport where two teams compete to score points by shooting a ball through the opposing team's hoop.",
#             metadata={"ids": "doc2:page3:chunk0"}
#         ),
#     ]
#     get_context(chunks_with_ids)
