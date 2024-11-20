from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user
import base64

controller = APIRouter(prefix='/voice-assistant')


@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(
        file: UploadFile = File(...),
        language: str = Form(...)   
    ):
        print('file_data >> ', file)
        print('Selected language:', language)

        # file_data = await file.read()
        # generated_ai_audio_file_path, llm_response_text, user_query = await handle_audio_from_user(file_data, language)
        # with open(generated_ai_audio_file_path, "rb") as audio_file:
        #     encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')
        # return {
        #     "transcription_text": llm_response_text,
        #      "user_query": user_query,
        #     "audio_data": encoded_audio
        # }