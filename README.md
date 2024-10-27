# ClimateLens 🌦️

Welcome to **ClimateLens** - your AI-powered weather sentinel. With ClimateLens, you can visualize real-time weather disasters, receive AI-generated incident summaries and safety tips, and chat with our bot for the latest weather insights. Stay informed, stay safe.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

ClimateLens is a web application designed to keep communities informed and prepared for severe weather events. Leveraging real-time data and AI, it offers users:
1. Real-time visualizations of weather disasters.
2. AI-generated incident summaries and safety tips.
3. Interactive chat functionality with an AI bot for weather-related insights.

Our mission is to empower users with essential information and safety guidance during critical times.

## Features

- **Real-Time Disaster Visualization**: Maps and graphics to help users understand current weather conditions.
- **AI-Generated Incident Summaries**: Concise, relevant summaries of ongoing events with safety recommendations.
- **Weather Chatbot**: Interactive chatbot for quick access to weather insights and questions.

## Tech Stack

- **Frontend**: React
- **Backend**: Flask
- **AI & ML**: IBM Watsonx.ai (or other AI service as required)
- **Mapping & Visualization**: Various APIs for real-time data visualization (like Mapbox or Google Maps, if applicable)

## Installation

### Prerequisites

- **Python 3.12+**
- **Node.js & npm**

### Backend Setup (Flask)

1. Clone the repository:
    ```bash
    git clone https://github.com/YourUsername/ClimateLens.git
    cd AI-Days-Hackathon-2024
    ```

2. Set up a virtual environment and install dependencies:
    ```bash
    python3 -m venv env
    source env/bin/activate  # For Windows, use `env\Scripts\activate`
    pip install -r requirements.txt
    ```

3. Run the Flask server:
    ```bash
    flask run
    ```

### Frontend Setup (React)

1. Navigate to the frontend directory:
    ```bash
    cd frontend
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

Configure any API keys (e.g., for AI or mapping services) in a `.env` file for both the Flask and React applications.

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to access ClimateLens.


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Creators

Luke Sutor
Ronan Virmani
Michael Carroll

---

**Stay informed, stay safe with ClimateLens.**
