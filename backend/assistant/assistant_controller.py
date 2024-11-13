from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user

controller = APIRouter(prefix='/voice-assistant')


@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(
        file: UploadFile = File(...),
        language: str = Form(...)   
    ):
        print('file_data >> ', file)
        print('Selected language:', language)
        file_data = await file.read()
        generated_ai_audio_file_path = await handle_audio_from_user(file_data, language)
        return FileResponse(generated_ai_audio_file_path, media_type='audio/mpeg', filename='ai_output')