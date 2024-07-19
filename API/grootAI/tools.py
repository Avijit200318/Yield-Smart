import os
import json
import requests
from PIL import Image
from dotenv import load_dotenv
from django.conf import settings
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')


@tool
def weather_report_tool(area: str) -> json:
    """Gets the weather and other details for a given area.
    Args:
        area (str): The area to get the weather for.
    """
    weather_api_key = os.getenv('WEATHER_API_KEY')
    link = f"http://api.weatherapi.com/v1/current.json?key={weather_api_key}&q={area}&aqi=yes"
    response = requests.get(link)
    return json.loads(response.text)

weather_report_tool.name = "weather_report"
weather_report_tool.description = "Get weather report with other details of the given area"

class weather_report_inputs(BaseModel):
   area: str = Field(description="area name")
weather_report_tool.args_schema = weather_report_inputs

@tool
def visual_details_tool(prompt: str, image_url: str) -> str:
    """Responding on image url input
    Args:
        prompt (str): prompt input
        image_url (str): url input
    """
    image_path = 'saved_image.jpg'
    response = requests.get(image_url)
    if response.status_code == 200:
        pass
        with open(image_path, "wb") as f:
            f.write(response.content)
    else:
        return(f"Error fetching image. Status code: {response.status_code}")

    message = HumanMessage(
        content=[
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": image_path}},
        ],
    )
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    try:
        response = model.invoke([message])
        print("Respond succesfully: ", response.content)
        return response.content
    except Exception as e: 
        print("Error found : ",e)
        return e

visual_details_tool.name = "visual_details"
visual_details_tool.description = "Get image details on given prompt"

class visual_details_inputs(BaseModel):
   prompt: str = Field(description="prompt for image")
   image_url: str = Field(description="url for image")
visual_details_tool.args_schema = visual_details_inputs

TOOLS = [weather_report_tool, visual_details_tool]

TOOLS_DETAILS = """
weather_report_tool :
Check for any area mentioned in current input, if not then check for any previous area name mentioned in history.
If you confirm that no area is mention in current input nor in history, then ask for the area name to the user.

visual_details_tool:
If user send any image url in image path, generate a prompt to get details result. Arrenge the output and send it in most user friendly way to user.
For any follow up questions on any previous image, use the image url to respond to that follow up question.
"""