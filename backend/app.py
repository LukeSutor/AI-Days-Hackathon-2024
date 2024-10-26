from flask import Flask, request
from flask_restful import Api, Resource

# Langchain imports
from langchain.prompts import PromptTemplate
from langchain_ibm import WatsonxLLM
from dotenv import load_dotenv
import os
import json
import re
from datetime import datetime, timezone

app = Flask(__name__)
api = Api(app)


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

if __name__ == '__main__':
    app.run(debug=True)
