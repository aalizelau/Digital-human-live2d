from PyPDF2 import PdfReader 

#process entire pdf
def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text 

#process only few pages
def get_pdf_preview(pdf_docs, max_pages=10):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        page_count = min(len(pdf_reader.pages), max_pages)
        for page_num in range(page_count):
            text += pdf_reader.pages[page_num].extract_text()
    # print("All PDF pages are processed.")
    # print(text)
    return text

#testing
# get_pdf_text(["/Users/funlau/Documents/ChatCampus/backend/pdf/KB_fake_news.pdf"])
# get_pdf_preview(["/Users/funlau/Documents/ChatCampus/backend/pdf/KB_fake_news.pdf"])
