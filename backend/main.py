# FastAPI and related imports — you know these from MusicMe
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# anthropic is the official library for calling Claude
import anthropic

# os and dotenv let us read the API key from the .env file
# so we never hardcode secrets in the code
import os
from dotenv import load_dotenv

# This reads the .env file and loads the variables into the environment
load_dotenv()

# Create the FastAPI app — same as MusicMe
app = FastAPI()

# CORS — you remember this from MusicMe
# It allows our React frontend (running on localhost:5174)
# to talk to our FastAPI backend (running on localhost:8000)
# Without this the browser would block the request
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines the shape of the data we expect to receive from the frontend
# The frontend will send a JSON object with one field: "code"
# Pydantic validates that the request has this field — same as MusicMe
class CodeRequest(BaseModel):
    code: str

# This is our one and only endpoint
# It receives the code from the frontend, sends it to Claude, returns the feedback
@app.post("/review")
async def review_code(request: CodeRequest):
    
    # Use the async client instead of the sync client
    client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    message = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""You are a brutally honest senior software engineer doing a code review.
                Review the following code and provide feedback.
                Be specific, be direct, and don't sugarcoat issues.
                Organize your feedback by severity: Critical, Warning, and Suggestion.
                
                Code to review:
                {request.code}"""
            }
        ]
    )
    
    return {"feedback": message.content[0].text}