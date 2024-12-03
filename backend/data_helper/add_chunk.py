from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
import os
from langchain_chroma import Chroma
from langchain.schema import Document


def add_data_to_vector_store(chunks_with_ids):
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")

    # Initialize vector store
    PERSIST_DIRECTORY = "./chroma"
    db = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        collection_name="campusAI",
        embedding_function=OpenAIEmbeddings()
    )

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
    
    print("Data ingestion completed.")

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
#             page_content="The Great Barrier Reef is the world's largest coral reef system, located off the coast of Queensland, Australia.",
#             metadata={"ids": "doc2:page2:chunk0"}
#         ),
#         Document(
#             page_content="Basketball is a team sport where two teams compete to score points by shooting a ball through the opposing team's hoop.",
#             metadata={"ids": "doc2:page3:chunk1"}
#         ),
#     ]
#     add_data_to_vector_store(chunks_with_ids)