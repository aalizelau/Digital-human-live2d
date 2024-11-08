from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from assistant.assistant_controller import controller as AssistantAudioController

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*"
]

app.include_router(AssistantAudioController, tags=['assistant'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)