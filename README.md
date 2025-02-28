# Digital Human Live2D

This project focuses on creating interactive digital character models that run directly in the browser for easy access. By incorporating Live2D animations, users can engage in natural, conversational interactions enhanced by fluid motions and lifelike expressions, creating a truly immersive experience.

## Features
- **Supports Both Text and Audio Input** – Communicate via typing or speech.
- **Multi-Language Support** – Available in English, Cantonese, and Mandarin.
- **Character Customization** – Import custom Live2D models to give your AI companion a unique appearance. Shape your AI companion's persona by modifying the Prompt.
- **Cursor Follow** – Character follows the mouse
- **Lip-Syncing** – Character’s mouth movements dynamically match the audio volume.
- **Good Extensibility** - Modular design allows easy integration of custom LLM, ASR, TTS, and other modules.
- **In-Memory Vector Store** – Enables contextual memory retrieval for more personalized interactions.

## Demo
The demo shows a light-hearted conversation with a AI persona called Mikan who is adorable, curious and witty. 

## Getting Started

Follow the steps below to set up the project on your local machine.

### Clone the Repository
```
git clone https://github.com/aalizelau/ChatCampus.git
```
### Backend Setup
1. Navigate to the backend directory:

   ```
   cd backend
   ```
2. Set up a virtual environment for the project:

   ```
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   
   ```
   pip install -r requirement.txt
   ```
4. Configure environment variables:

   - Create a Google Cloud Project with TTS Service enabled and download JSON credentials file.
   - Obtain your `GOOGLE_APPLICATION_CREDENTIALS` and `OPENAI_API_KEY` and set them as environment variables
5. Start the server:

   ```
   uvicorn main:app
   ```
6. Access the API documentation:<br>

   Open your browser and navigate to: http://127.0.0.1:8000/docs


### Frontend Setup
1. Navigate to the frontend directory:

   ```
   cd frontend
   ```
3. Install dependencies:

   ```
   npm install
   ```
5. Start the development server:

   ```
   npm run dev
   ```
7. Access the application:<br>

   Open your browser and navigate to: http://localhost:3000
