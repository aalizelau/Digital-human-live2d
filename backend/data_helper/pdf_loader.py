from langchain.document_loaders import PyPDFDirectoryLoader
import os


def load_documents():
    #KB source
    script_dir = os.path.dirname(__file__)
    backend_dir = os.path.abspath(os.path.join(script_dir, '..'))
    directory_path  = os.path.join(backend_dir, 'PDF')
    # print(f"PDF File Path: {directory_path}")
    
    loader = PyPDFDirectoryLoader(directory_path)
    documents = loader.load()
    # print(documents[1])
    return documents

#testing 
# load_documents()

