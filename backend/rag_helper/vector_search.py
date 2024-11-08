from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

def get_context(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2},
    )
    return retriever