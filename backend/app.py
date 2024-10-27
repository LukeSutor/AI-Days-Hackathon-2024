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
        user_prompt = data.get("prompt", "").strip()

        if not user_prompt:
            return {"error": "No prompt provided."}, 400

        # Simplified and clarified context with proper examples
        context = (
            "You are a specialized assistant dedicated solely to providing information about natural disasters and safety tips. "
            "Your responses must be:\n"
            "- **Concise and Informative:** Provide clear and direct answers without unnecessary details.\n"
            "- **JSON Format:** Always respond with a JSON object containing only the key \"answer\".\n"
            "- **Relevant Content:** Only address topics related to natural disasters and safety tips. Do not provide information on unrelated subjects.\n\n"
            
            "If the user's question does not pertain to natural disasters or safety tips, respond with a JSON object containing an appropriate message under the \"answer\" key.\n\n"
            
            "Example Interaction:\n"
            "User: How do I prepare for a hurricane?\n"
            "Assistant:\n"
            "{\n"
            "    \"answer\": \"To prepare for a hurricane, create an emergency kit, secure your property, and follow evacuation orders if issued.\"\n"
            "}\n\n"
            
            "User: What's the capital of France?\n"
            "Assistant:\n"
            "{\n"
            "    \"answer\": \"I'm sorry, I can only provide information related to natural disasters and safety tips.\"\n"
            "}"
        )

        # Combine context with the user prompt
        combined_prompt = f"{context}\nUser: {user_prompt}\nAssistant:"

        # Generate the response from the model
        try:
            generated_response = modelTwo.generate(prompt=[combined_prompt], params=generate_params)
        except Exception as e:
            print(f"Model generation error: {e}")
            return {"error": "Error generating response from the model."}, 500

        # Extract the generated text
        response = generated_response[0]['results'][0]['generated_text']
        
        # Log the original response
        print("Original Model Response:", response)

        # Clean the response
        cleaned_response = response.strip()
        print("Cleaned Response:", cleaned_response)

        # Extract JSON object with the "answer" key
        json_regex = re.compile(r'\{\s*"answer"\s*:\s*".*?"\s*\}', re.DOTALL)
        match = json_regex.search(cleaned_response)
        
        if match:
            json_string = match.group(0)
            try:
                json_response = json.loads(json_string)
                return json_response, 200
            except json.JSONDecodeError as e:
                print(f"JSONDecodeError: {e}")
                return {"error": "Invalid JSON format in response"}, 400
        else:
            # Attempt to extract any JSON object
            json_match = re.search(r'\{[\s\S]*\}', cleaned_response)
            if json_match:
                json_string = json_match.group(0)
                try:
                    json_response = json.loads(json_string)
                    return json_response, 200
                except json.JSONDecodeError as e:
                    print(f"JSONDecodeError during fallback: {e}")
                    return {"error": "Invalid JSON format in response"}, 400
            else:
                print("No JSON object found in the response")
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

class IncidentTipsAPI(Resource):
    def post(self):
        try:            
            # Parse request data
            incident_data = request.get_json(force=True)
            if not incident_data:
                return {"error": "No incident data provided."}, 400

            # Extract data
            properties = incident_data.get('properties', {})
            event = properties.get('event', 'Unknown Event')
            description = properties.get('description', 'No description provided.')
            ends = properties.get('ends')

            # Process timestamp
            try:
                if ends:
                    ends_time = datetime.fromisoformat(ends.replace('Z', '+00:00'))
                    current_time = datetime.now(timezone.utc)
                    is_ongoing = current_time < ends_time
                else:
                    is_ongoing = True
            except ValueError as e:
                is_ongoing = True

            incident_status = "The incident is currently ongoing." if is_ongoing else f"The incident ended on {ends}."

            # Prepare and execute prompt
            prompt_template = """You are an emergency response assistant. Given the following incident details, provide exactly three concise safety tips for affected individuals. These tips should be tailored for their specific location and the incident they are experiencing. Respond in plaintext format with each tip separated by a pipe (|) character. Do not include any additional text, formatting, numbering, or characters other than the tips and pipe separators.
                Incident Event:
                {event}
                Incident Description:
                {description}
                Incident Status:
                {incident_status}
                Example Response:
                Stay indoors and away from windows.|Secure loose outdoor objects.|Have a battery-powered radio for updates.
                Your Response:
            """
            prompt = PromptTemplate.from_template(prompt_template)
            agent = prompt | model

            raw_response = agent.invoke({
                "event": event,
                "description": description,
                "incident_status": incident_status
            })

            # Process response
            raw_response = raw_response.strip()
            raw_response = raw_response.replace('\n', '')
            raw_response = raw_response.replace('||', '|')
            raw_response = raw_response.removeprefix("|")
            raw_response = raw_response.removesuffix("|")
            tips = raw_response.split("|")
            
            if len(tips) == 1:
                tips = [tips.strip() + '.' for tips in tips[0].split('.') if tips.strip()]
            
            # Remove empty tips
            tips = [tip.strip() for tip in tips if tip.strip()]

            response = {"safety_tips": tips}
            return response, 200

        except Exception as e:
            return {"error": "An unexpected error occurred"}, 500

api.add_resource(IncidentTipsAPI, '/incident_tips')


class IncidentStepsAPI(Resource):
    def post(self):
        try:            
            # Parse request data
            incident_data = request.get_json(force=True)
            if not incident_data:
                return {"error": "No incident data provided."}, 400

            # Extract data
            properties = incident_data.get('properties', {})
            event = properties.get('event', 'Unknown Event')
            description = properties.get('description', 'No description provided.')
            ends = properties.get('ends')

            # Process timestamp
            try:
                if ends:
                    ends_time = datetime.fromisoformat(ends.replace('Z', '+00:00'))
                    current_time = datetime.now(timezone.utc)
                    is_ongoing = current_time < ends_time
                else:
                    is_ongoing = True
            except ValueError as e:
                is_ongoing = True

            incident_status = "The incident is currently ongoing." if is_ongoing else f"The incident ended on {ends}."

            # Prepare and execute prompt
            prompt_template = """You are an emergency response assistant. Given the following incident details, provide exactly three concise next steps for affected individuals to follow. These steps should be tailored for their specific location and the incident they are experiencing. Respond in plaintext format with each step separated by a pipe (|) character. Do not include any additional text, formatting, numbering, or characters other than the steps and pipe separators.
            Incident Event:
            {event}
            Incident Description:
            {description}
            Incident Status:
            {incident_status}
            Example Response:
            Evacuate the area immediately.|Follow instructions from local authorities.|Seek medical attention if needed.
            Your Response:
            """
            prompt = PromptTemplate.from_template(prompt_template)
            agent = prompt | model

            raw_response = agent.invoke({
                "event": event,
                "description": description,
                "incident_status": incident_status
            })

            # Process response
            raw_response = raw_response.strip()
            raw_response = raw_response.replace('\n', '')
            raw_response = raw_response.replace('||', '|')
            raw_response = raw_response.removeprefix("|")
            raw_response = raw_response.removesuffix("|")
            next_steps = raw_response.split("|")

            if len(next_steps) == 1:
                next_steps = [step.strip() + '.' for step in next_steps[0].split('.') if step.strip()]

            # Remove empty next steps or steps that are only spaces
            next_steps = [step.strip() for step in next_steps if step.strip()]

            response = {"steps_to_take": next_steps}
            return response, 200

        except Exception as e:
            return {"error": "An unexpected error occurred"}, 500

api.add_resource(IncidentStepsAPI, '/incident_steps')

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
        prompt_template = """You are an emergency response assistant. Given the following incident details, provide a concise and informative summary of the incident's description. The summary should be tailored for people who want a quick update on the alert. The description should describe what is happening and where. Respond in plaintext format, do not include any additional text or formatting.
        Incident Event:
        {event}
        Incident Description:
        {description}
        Incident Status:
        {incident_status}
        Your Response:
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

        # Return the summary
        return {"description": raw_response}, 200

api.add_resource(DescriptionSummaryAPI, '/summarize_description')

if __name__ == '__main__':
    app.run()
