from langchain.schema.document import Document 

def get_processed_chunks(chunks):
    last_page_id = None 
    current_chunk_index = 0
    chunk_with_ids = []

    for chunk in chunks:
            source = chunk.metadata.get("source")
            page = chunk.metadata.get("page")
            current_page_id = f"{source}:{page}"
            
            if current_page_id == last_page_id:
                    current_chunk_index +=1
            else:
                    current_chunk_index =0
                    
            chunk_id = f"{current_page_id}:{current_chunk_index}"
            chunk.metadata["ids"] = chunk_id 
            chunk_with_ids.append(chunk)
                    
            last_page_id = current_page_id
            
    return chunk_with_ids

#test 
# test_chunks = [
#     Document(metadata={"source": "book1", "page": 1}, page_content="This is page 1 of book 1."),
#     Document(metadata={"source": "book1", "page": 2}, page_content="This is page 2 of book 1."),
#     Document(metadata={"source": "book2", "page": 1}, page_content="This is page 1 of book 2."),
#     Document(metadata={"source": "book2", "page": 1}, page_content="This is another chunk from page 1 of book 2."),
# ]
# processed_chunks = get_processed_chunks(test_chunks)
# print(processed_chunks)
