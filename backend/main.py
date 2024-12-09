from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from assistant.assistant_controller import controller as AssistantAudioController
from assistant.assistant_service import data_pipeline
from contextlib import asynccontextmanager

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*"
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("running start up process")
    await data_pipeline()
    yield  # This yields control to allow the application to run
    # Shutdown: Add cleanup code if needed
    print("Application shutting down...")

# Attach the lifespan handler to the app
app.router.lifespan_context = lifespan

app.include_router(AssistantAudioController, tags=['assistant'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)