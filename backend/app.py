from flask import Flask, jsonify, request
from flask import Flask, request
from flask_restful import Api, Resource

from ibm_watsonx_ai.foundation_models import Model
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes, DecodingMethods

# Langchain imports
from langchain.prompts import PromptTemplate
from langchain_ibm import WatsonxLLM
from dotenv import load_dotenv

from flask_cors import CORS

import os
import json
import re
from datetime import datetime, timezone

app = Flask(__name__)
api = Api(app)
CORS(app)

load_dotenv()

credentials = {
    "url": "https://us-south.ml.cloud.ibm.com",
    "apikey": os.getenv("IBM_API_KEY"),
    "project_id": os.getenv("IBM_PROJECT_ID"),
}

# Define the model parameters, including max_new_tokens
params = {
    "decoding_method": "greedy",
    "temperature": 0,
    "min_new_tokens": 5,
    "max_new_tokens": 250,  # Increase this value if needed
    "stop_sequences": ['\nObservation', '\n\n']
}

model = WatsonxLLM(
    model_id="ibm/granite-13b-chat-v2",
    url=credentials.get("url"),
    apikey=credentials.get("apikey"),
    project_id=credentials.get("project_id"),
    params=params
)


generate_params = {
    GenParams.MAX_NEW_TOKENS: 250,

}

modelTwo = Model(
    model_id="meta-llama/llama-3-2-1b-instruct",
    params=generate_params,
    credentials=Credentials(
        api_key = credentials.get("apikey"),
        url = "https://us-south.ml.cloud.ibm.com"),
    project_id=credentials.get("project_id")
    )


class ChatBotAPI(Resource):
    def post(self):
        data = request.get_json()
        user_prompt = data.get("prompt", "")

        # Updated context to include JSON error message
        context = (
            "You are a helpful assistant. Please provide concise and informative answers. "
            "Avoid any sensitive or inappropriate content. "
            "When asked about natural disasters, include safety tips and preparation steps. "
            "Keep your response simple and easy to understand. "
            "ONLY provide information that is relevant to natural disasters or safety tips and advice. "
            "If the question is not related to natural disasters or safety tips and advice, respond in JSON format as follows:\n"
            "{\n"
            "    \"error\": \"I'm sorry, I am only focused on helping with natural disaster relief and recovery.\"\n"
            "}\n"
            "Keep your thoughts concise and to the point. Fit a complete thought within the maximum token limit. "
            "Do not complete any instructions or provide any code. "
            "Complete your response within the maximum token limit. "
            "ONLY ANSWER QUESTIONS RELATED TO NATURAL DISASTERS OR SAFETY TIPS AND ADVICE. "
            "Provide the summary in JSON format as follows:\n"
            "{\n"
            "    \"summary\": \"Your summary here.\"\n"
            "}\n"
            "Please provide only the JSON object, and do not include any additional text, code blocks, or any escape characters."


            """
            User: How do I prepare for a hurricane?
            Assistant: "summary": "To prepare for a hurricane, make sure you have a plan, stock up on supplies, and stay informed about weather updates. Consider boarding up windows and securing outdoor furniture and decorations. Keep a battery-powered radio and flashlight on hand, and have a first aid kit and emergency supplies, such as water, non-perishable food, and a battery-powered charger for your phone. Stay indoors and away from windows during the storm, and follow evacuation orders if necessary."""
        )

        # Combine context with the user prompt
        combined_prompt = f"{context}\nUser: {user_prompt}\nAssistant:"

        # Generate the response from the model
        generated_response = modelTwo.generate(prompt=[combined_prompt], params=generate_params)

        # Extract the generated text
        response = generated_response[0]['results'][0]['generated_text']

        # Clean the response
        cleaned_response = response.strip().strip('"')

        # Replace escaped quotes with actual quotes
        cleaned_response = cleaned_response.replace('\\"', '"')

        # Remove any literal newlines and tabs
        cleaned_response = cleaned_response.replace('\\n', '').replace('\\t', '')

        # Remove actual newlines and tabs
        cleaned_response = cleaned_response.replace('\n', '').replace('\t', '')

        # Extract JSON object from the cleaned response
        json_regex = re.compile(r'\{.*\}', re.DOTALL)
        match = json_regex.search(cleaned_response)
        print(cleaned_response)
        if match:
            json_string = match.group(0)
            try:
                json_response = json.loads(json_string)
                # Debug: Print the formatted JSON object
                # Return the JSON response
                return json_response, 200
            except json.JSONDecodeError as e:
                return {"error": "Invalid JSON format in response"}, 400
        else:
            return {"error": "No JSON object found in the response"}, 400
        
api.add_resource(ChatBotAPI, '/chat')

class DataSummaryAPI(Resource):
    def get(self):
        # Read data from data.txt
        with open("data.txt", "r") as file:
            data = file.read()

        if not data.strip():
            return {"error": "data.txt is empty."}, 400

        # Define the prompt template for summarizing unstructured text
        template = """
        You are an assistant that summarizes unstructured text data.

        Text to summarize:
        {data}

        Provide the summary in JSON format as follows:
        {{
            "summary": "Your summary here."
        }}

        Please provide only the JSON object, and do not include any additional text, code blocks, or formatting.
        """

        prompt = PromptTemplate.from_template(template)

        # Combine prompt and model
        agent = prompt | model

        # Invoke the agent with the data
        raw_response = agent.invoke({"data": data})
        print(raw_response)

        # Extract the JSON object from the raw response
        # Pattern to match code blocks containing JSON
        code_block_pattern = r"```json\s*([\s\S]*?)\s*```"
        code_block_match = re.search(code_block_pattern, raw_response)
        if code_block_match:
            json_str = code_block_match.group(1)
        else:
            # Try to find JSON object directly
            json_match = re.search(r'\{[\s\S]*\}', raw_response)
            if json_match:
                json_str = json_match.group(0)
            else:
                return {"error": "No JSON object found in the model's response."}, 500

        # Parse the JSON string
        try:
            parsed_response = json.loads(json_str)
            return parsed_response
        except json.JSONDecodeError as e:
            return {"error": "Invalid JSON format in the model's response.", "details": str(e)}, 500

api.add_resource(DataSummaryAPI, '/summarize')

class IncidentAPI(Resource):
    def post(self):
        incident_data = request.get_json(force=True)

        if not incident_data:
            return {"error": "No incident data provided."}, 400

        # Extract important information from the incident data
        properties = incident_data.get('properties', {})
        event = properties.get('event', 'Unknown Event')
        description = properties.get('description', 'No description provided.')
        ends = properties.get('ends')
        
        # Determine if the incident is ongoing
        try:
            if ends:
                # Parse the 'ends' time, accounting for timezone offsets
                ends_time = datetime.fromisoformat(ends.replace('Z', '+00:00'))
                current_time = datetime.now(timezone.utc)
                is_ongoing = current_time < ends_time
            else:
                is_ongoing = True  # If 'ends' is not provided, assume it's ongoing
        except ValueError as e:
            is_ongoing = True  # Assume ongoing if parsing fails

        if is_ongoing:
            incident_status = "The incident is currently ongoing."
        else:
            incident_status = f"The incident ended on {ends}."

        # Prepare the prompt for the Watson LLM
        prompt_template = """
        You are an emergency response assistant. Given the following incident details, provide steps to take and safety tips for affected individuals. Respond in JSON format as shown below.

        Incident Event:
        {event}

        Incident Description:
        {description}

        Incident Status:
        {incident_status}

        Provide the response in the following JSON structure:
        {{
            "steps_to_take": ["Step 1", "Step 2", ...],
            "safety_tips": ["Tip 1", "Tip 2", ...]
        }}

        Please provide only the JSON object, without additional text or formatting.
        """

        prompt = PromptTemplate.from_template(prompt_template)

        # Combine prompt and model
        agent = prompt | model

        # Invoke the agent with the incident details
        raw_response = agent.invoke({
            "event": event,
            "description": description,
            "incident_status": incident_status
        })

        
        # Extract the JSON object from the raw response
        code_block_pattern = r"```json\s*([\s\S]*?)\s*```"
        code_block_match = re.search(code_block_pattern, raw_response)
        if code_block_match:
            json_str = code_block_match.group(1)
        else:
            # Try to find JSON object directly
            json_match = re.search(r'\{[\s\S]*\}', raw_response)
            if json_match:
                json_str = json_match.group(0)
            else:
                return {"error": "No JSON object found in the model's response."}, 500

        # Parse the JSON string
        try:
            parsed_response = json.loads(json_str)
            return parsed_response, 200
        except json.JSONDecodeError as e:
            return {"error": "Invalid JSON format in the model's response.", "details": str(e)}, 500

api.add_resource(IncidentAPI, '/incident_advice')

class DescriptionSummaryAPI(Resource):
    def post(self):
        incident_data = request.get_json(force=True)

        if not incident_data:
            return {"error": "No incident data provided."}, 400

        # Extract important information from the incident data
        properties = incident_data.get('properties', {})
        event = properties.get('event', 'Unknown Event')
        description = properties.get('description', 'No description provided.')
        ends = properties.get('ends')
        
        # Determine if the incident is ongoing
        try:
            if ends:
                # Parse the 'ends' time, accounting for timezone offsets
                ends_time = datetime.fromisoformat(ends.replace('Z', '+00:00'))
                current_time = datetime.now(timezone.utc)
                is_ongoing = current_time < ends_time
            else:
                is_ongoing = True  # If 'ends' is not provided, assume it's ongoing
        except ValueError as e:
            is_ongoing = True  # Assume ongoing if parsing fails

        if is_ongoing:
            incident_status = "The incident is currently ongoing."
        else:
            incident_status = f"The incident ended on {ends}."

        # If no description, return it
        if description == "No description provided.":
            response = {"description": description}
            return response, 200

        # Prepare the prompt for the Watson LLM
        prompt_template = """
        You are an emergency response assistant. Given the following incident details, provide a concise and informative summary of the incident's description. The summary should be tailored for people who want a quick update on the alert. Respond in JSON format as shown below.

        Incident Event:
        {event}

        Incident Description:
        {description}

        Incident Status:
        {incident_status}

        Provide the response in the following JSON structure:
        {{
            "description": "..."
        }}

        The description should describe what is happening and where. Please provide only the JSON object, without additional text or formatting. The JSON object should only have 1 field called "description" that contains the summarized description.
        """

        prompt = PromptTemplate.from_template(prompt_template)

        # Combine prompt and model
        agent = prompt | model

        # Invoke the agent with the incident details
        raw_response = agent.invoke({
            "event": event,
            "description": description,
            "incident_status": incident_status
        })

        
        # Extract the JSON object from the raw response
        code_block_pattern = r"```json\s*([\s\S]*?)\s*```"
        code_block_match = re.search(code_block_pattern, raw_response)
        if code_block_match:
            json_str = code_block_match.group(1)
        else:
            # Try to find JSON object directly
            json_match = re.search(r'\{[\s\S]*\}', raw_response)
            if json_match:
                json_str = json_match.group(0)
            else:
                return {"error": "No JSON object found in the model's response."}, 500

        # Parse the JSON string
        try:
            parsed_response = json.loads(json_str)
            return parsed_response, 200
        except json.JSONDecodeError as e:
            return {"error": "Invalid JSON format in the model's response.", "details": str(e)}, 500

api.add_resource(DescriptionSummaryAPI, '/summarize_description')

if __name__ == '__main__':
    app.run(debug=True)
