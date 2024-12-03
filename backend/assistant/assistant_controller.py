from fastapi import APIRouter, UploadFile, File, Form, Body
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user, handle_text_from_user, generate_ai_response_audio, test_wrapper
import base64

controller = APIRouter(prefix='/voice-assistant')

@controller.post('/test',status_code=200)
async def test_speed(text_data: str = Body(...)):
       ai_response = await test_wrapper(text_data)
       return {"response": ai_response}


@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(
        file: UploadFile = File(...),
    ):
        file_data = await file.read()
        user_query = await handle_audio_from_user(file_data)
        return { "user_query": user_query }

@controller.post('/audio-response', status_code=200)
async def handle_receive_user_query(
       user_query: str = Body(...),
       language: str = Form(...)
):
       print("Selected language: ", language)
       generated_ai_audio_file_path, llm_response_text = await generate_ai_response_audio(user_query, language)
       with open(generated_ai_audio_file_path, "rb") as audio_file:
            encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')
       return {
        "ai_response_text": llm_response_text,
        "audio_data": encoded_audio
       }


@controller.post('/text-message', status_code=200)
async def handle_receive_text_data(text_data: str = Body(...)):
      print("information sent: ", text_data)
      ai_response = await handle_text_from_user(text_data)
      return {"response": ai_response}