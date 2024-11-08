from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore