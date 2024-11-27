def get_processed_chunks(chunks):
    last_page_id = None 
    current_chunk_index = 0
    chunk_with_ids = []

    for chunk in chunks:
            source = chunk["metadata"].get("source")
            page = chunk["metadata"].get("page")
            current_page_id = f"{source}:{page}"
            
            if current_page_id == last_page_id:
                    current_chunk_index +=1
            else:
                    current_chunk_index =0
                    
            chunk_id = f"{current_page_id}:{current_chunk_index}"
            chunk["metadata"]["ids"] = chunk_id 
            chunk_with_ids.append(chunk)
                    
            last_page_id = current_page_id
            
    return chunk_with_ids

#test 
# chunks= [
#   {
#       "page_content": "Text of the chunk...",
#       "metadata": {
#           "source": "path_to_your_pdfs/example_document.pdf",
#           "page": 1
#       }
#   },
#   {
#       "page_content": "Another chunk...",
#       "metadata": {
#           "source": "path_to_your_pdfs/example_document.pdf",
#           "page": 1
#       }
#   }
# ]
# processed_chunks = get_processed_chunks(chunks)
# print(processed_chunks)
