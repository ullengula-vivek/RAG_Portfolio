def chunk_text(text, max_words=200, overlap=50):
    """
    Split text into chunks with overlap
    """
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), max_words - overlap):
        chunk = " ".join(words[i:i + max_words])
        chunks.append(chunk)
        
        # Stop if we've reached the end
        if i + max_words >= len(words):
            break
    
    return chunks