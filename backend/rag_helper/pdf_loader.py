from langchain.document_loaders import PyPDFDirectoryLoader
import sys
import os


def load_documents():
	# Add the backend directory to the Python module search path
    script_dir = os.path.dirname(__file__)
    backend_dir = os.path.abspath(os.path.join(script_dir, '..'))
    sys.path.append(backend_dir)

    #KB source
    script_dir = os.path.dirname(__file__)
    backend_dir = os.path.abspath(os.path.join(script_dir, '..'))
    directory_path  = os.path.join(backend_dir, 'PDF')
    print(f"PDF File Path: {directory_path}")
    # pdf_path=["/Users/funlau/Documents/ChatCampus/backend/pdf/KB_fake_news.pdf"] 
    loader = PyPDFDirectoryLoader(directory_path)
    documents = loader.load()
    print(documents[1])
    return documents

#testing 
load_documents()

