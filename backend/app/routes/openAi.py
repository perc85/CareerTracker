from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()


client = OpenAI(api_key=os.environ.get("OPEN_AI_SECRET_KEY"))

response = client.responses.create(
    model="gpt-5.4-mini",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Give Feedback on this resume and how to better it to pass ATS",
                },
                {
                    "type": "input_file",
                    "file_url": ""
                },
            ],
        }
    ],
)

print(response.output_text)
