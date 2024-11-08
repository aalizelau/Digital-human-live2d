from PyPDF2 import PdfReader 

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    print("All PDF pages are processed.")
    return text 

#testing
get_pdf_text(["/Users/funlau/Documents/ChatCampus/backend/pdf/KB_fake_news.pdf"])
