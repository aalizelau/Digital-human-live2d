import tempfile
import os
from uuid import uuid4

TMP_FOLDER_NAME = "Tmp"


def create_if_not_exists(path: str):
    os.makedirs(path, mode=0o755, exist_ok=True)


def get_tmp_folder_path():
    base_path = os.getcwd()
    path = os.path.join(base_path, TMP_FOLDER_NAME)
    create_if_not_exists(path)
    return path


def get_unique_tmp_file_path():
    file_path = os.path.join(get_tmp_folder_path(), str(uuid4()))
    return file_path


def create_unique_tmp_file(file_suffix: str):
    return f'{get_unique_tmp_file_path()}_{file_suffix}'


def persist_binary_file_locally(data: bytes, file_suffix: str) -> str:
    file_path = create_unique_tmp_file(file_suffix)
    with open(file_path, 'wb') as f:
        f.write(data)

    return file_path


# if __name__ == "__main__":
#     print(get_tmp_folder_path())

# if __name__ == "__main__":
#     # Test 1: Print the temporary folder path
#     print("Temporary folder path:", get_tmp_folder_path())

#     # Test 2: Generate a unique file path and print it
#     unique_file_path = create_unique_tmp_file("testfile.txt")
#     print("Unique temporary file path:", unique_file_path)

#     # Test 3: Persist a small binary file and verify it was created
#     sample_data = b"Hello, this is a test."
#     persisted_file_path = persist_binary_file_locally(sample_data, "testfile.bin")
#     print("Persisted file path:", persisted_file_path)
    
#     # Check if the file exists and print its contents
#     if os.path.exists(persisted_file_path):
#         print("File exists. Reading contents:")
#         with open(persisted_file_path, 'rb') as f:
#             print(f.read())
#     else:
#         print("File was not created.")