import asyncio
from utils.file_utils import persist_binary_file_locally, create_unique_tmp_file
from helper import convert_file_to_readable_mp3
from helper import convert_audio_to_text
from helper import handle_get_response_for_user
from helper import convert_text_to_audio


def __get_transcoded_audio_file_path(data: bytes) -> str:
    local_file_path = persist_binary_file_locally(data, file_suffix='user_audio.mp3')
    local_output_file_path = create_unique_tmp_file(file_suffix='transcoded_user_audio.mp3')
    convert_file_to_readable_mp3(
        local_input_file_path=local_file_path,
        local_output_file_path=local_output_file_path
    )

    return local_output_file_path


async def handle_audio_from_user(file: bytes) -> str:
    """
        Entrypoint
    :param file:
    :return:
    """
    print("handle audio from user")
    transcoded_user_audio_file_path = __get_transcoded_audio_file_path(file)
    text_content = convert_audio_to_text(transcoded_user_audio_file_path)
    ai_text_reply = handle_get_response_for_user(text_content)
    print("ai_text_reply: ", ai_text_reply)
    output_audio_local_file_path = convert_text_to_audio(ai_text_reply)

    return ("Audio saved at:", output_audio_local_file_path)

if __name__ == "__main__":
    with open("/Users/funlau/Documents/ChatCampus/backend/audio/test_for_all.mp3", "rb") as f:
        mp3_data = f.read()

    # Running the async function in synchronous context for testing
    asyncio.run(handle_audio_from_user(mp3_data))