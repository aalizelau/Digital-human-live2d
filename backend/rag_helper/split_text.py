from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema.document import Document 

def get_text_chunks(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 200,
        length_function = len,
        is_separator_regex=False,
    )
    chunks = text_splitter.split_documents(documents)
    return chunks