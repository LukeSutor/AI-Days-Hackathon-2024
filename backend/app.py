from flask import Flask, jsonify, request
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
import logging
import re

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
    params=params  # Include the params here
)


generate_params = {
    GenParams.MAX_NEW_TOKENS: 50,

}

modelTwo = Model(
    model_id="ibm/granite-13b-chat-v2",
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

        try:
            generated_response = modelTwo.generate(prompt=[user_prompt], params=generate_params)
            # generated_response = modelTwo.chat(messages=messages)
            print(generated_response)
            response = generated_response[0]['results'][0]['generated_text']
            return json.dumps(response), 200
        except Exception as e:
            return {"error": str(e)}, 50
                

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
api.add_resource(ChatBotAPI, '/chat')

if __name__ == '__main__':
    app.run(debug=True)
