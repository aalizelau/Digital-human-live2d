# ChatCampus

An AI-powered campus assistant to help users navigate academic life, answer questions, and access campus resources efficiently.

## Features
- AI-driven conversational assistant
- Academic and campus life Q&A
- Resource navigation support
- Easily customizable for specific institutions

## Installation

Follow the steps below to set up the project on your local machine.

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **Python**

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

   Obtain your `GOOGLE_APPLICATION_CREDENTIALS` and `OPENAI_API_KEY` and set them as environment variables
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
