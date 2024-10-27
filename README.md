# ClimateLens: Empowering Communities Through Real-time Disaster Intelligence

## Inspiration
In recent years, we've witnessed an unprecedented surge in natural disasters worldwide, from devastating wildfires to catastrophic floods. What struck us most was not just the increasing frequency of these events, but the critical gap in how this information is communicated to communities. While weather alerts exist, they're often technical and difficult for the average person to interpret and act upon. This realization inspired us to create ClimateLens, a solution that bridges the gap between complex weather data and actionable insights for communities.

## What it does
ClimateLens is an interactive web application featuring a dynamic 3D globe that visualizes real-time weather alerts across the United States. By integrating with the weather.gov alerts API, we highlight affected counties using a color-coded severity system. Users can click on any highlighted county to receive:
- AI-generated plain-language summaries of current weather incidents
- Practical, actionable tips for preparation and response
- Customized next steps based on the specific type and severity of the event

Additionally, our AI-powered chatbot serves as a 24/7 knowledge resource for any weather or natural disaster-related queries, making critical information accessible to everyone

## How we built it
Our solution combines several key technologies:
- Frontend: Built using React, Three.js, react-globe.gl, and TailwindCSS
- Backend: Flask integrated with IBM's watsonx.ai platform
- AI Integration: Leveraged IBM's watsonx.ai platform and its Granite and Llama models to generate incident summaries and recommendations
- Natural Language Processing: Implemented a chatbot using Meta's Llama model for natural disaster information

## Challenges we ran into
1. Data Complexity: Processing and storing weather alert data proved challenging due to the amount of data and issues with matching inconsistently named counties.
2. Real-time Updates: Ensuring smooth real-time updates without overwhelming the system or creating laggy user experiences required careful optimization.
3. AI Response Accuracy: Prompt-tuning the AI to provide accurate, relevant, and actionable information while maintaining a conversational tone took significant iteration.
4. Geographic Visualization: Implementing the interactive globe with accurate county-level highlighting required complex geometric calculations and optimization.
5. Globe Optimizations: Ensuring that the globe remained performant no matter how many counties were added to it required that the 3D county data was high quality without sacrificing performance.

## What we learned
- The importance of user-centered design in crisis communication
- Practical applications of AI in disaster preparedness and response
- Technical skills in working with geographic data and real-time APIs
- The value of cross-disciplinary collaboration in solving complex problems

## What's next for ClimateLens
We envision several exciting expansions for ClimateLens:
1. Global Coverage: Extending our platform beyond the United States to provide worldwide disaster monitoring and response guidance
2. Mobile App Development: Creating a mobile version with push notifications for immediate alerts
3. Community Features: Adding functionality for users to share local updates and resources
5. Integration with Emergency Services: Partnering with local emergency response teams to provide direct communication channels

Our goal is to continue evolving ClimateLens into a comprehensive platform that not only informs but actively helps communities build resilience against natural disasters.

# Installation

### Prerequisites

- Python 3.12 **(Note that the Python version must be 3.12)**
- Node.js & npm

### Backend Setup (Flask)

1. Clone the repository:
    ```bash
    git clone https://github.com/LukeSutor/AI-Days-Hackathon-2024.git
    cd AI-Days-Hackathon-2024
    ```

2. Set up a virtual environment and install dependencies:
    ```bash
    cd backend
    conda create -n hackathon python=3.12
    conda activate hackathon
    pip install -r requirements.txt
    ```

3. Run the Flask server:
    ```bash
    python app.py
    ```

### Frontend Setup (React)

1. In a new terminal window, navigate to the frontend directory:
    ```bash
    cd web
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

### Environment Variables

There are two required environment variables shown in ```/backend/.env.template```  
Please fill these values with your IBM API Key and IBM Project ID and save them in a ```.env``` file inside of ```/backend```  
Here are the instructions for getting your own access keys: https://ibm.ent.box.com/s/4l0atwnkb2xzw54d9eyflm77pf9sdsc9

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to access ClimateLens.


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Creators

Luke Sutor  
Ronan Virmani  
Michael Carroll  
Mateo Friedman  

---

**Stay informed, stay safe with ClimateLens.**
