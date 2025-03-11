# Waygen: AI-Powered Smart Traffic Management System

<p align="center">
  <em>AI-powered roads, seamless journeys – Built with MapMyIndia</em>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-green.svg)](https://flask.palletsprojects.com/)

## 🌟 Overview

Waygen is an AI-driven Smart Traffic Management System designed to revolutionize urban mobility by integrating computer vision, IoT, and geospatial intelligence. Our solution addresses the critical challenges of urban traffic congestion through real-time monitoring, analysis, and optimization.

## 🚦 Problem Statement

Urban traffic congestion is a major challenge, leading to:
- Delays and wasted time
- Increased fuel consumption and pollution
- Higher accident rates
- Emergency vehicle delays
- Inefficient traffic flow

Conventional traffic lights operate on fixed timers which do not adapt to real-time traffic conditions. This causes:
- Wasted green lights on empty lanes
- Vehicle pile-ups in congested directions
- Long queues and increased delays
- Emergency vehicle struggles in critical situations
- Outdated systems compared to modern smart adaptive solutions

## 💡 Our Solution

WayGen revolutionizes traffic management through:
- **AI-driven traffic analysis** - YOLO-based vehicle detection continuously monitors traffic flow
- **Dynamic signal adjustment** - Traffic lights adapt in real-time based on congestion patterns
- **IoT integration** - Raspberry Pi-powered signal controllers ensure seamless optimization
- **Geospatial intelligence** - MapMyIndia integration provides real-time navigation and alternative routes
- **Emergency vehicle prioritization** - Automatic detection and signal adjustment for emergency vehicles
- **Congestion prediction** - AI models analyze patterns to prevent bottlenecks before they occur

## 🔑 Core Features

- ✅ **AI-based Real-time Traffic Light Control**
  - Monitors traffic density and adjusts signal timings dynamically
  - Reduces wait times and improves traffic flow efficiency

- ✅ **Emergency Vehicle Detection & Prioritization**
  - Detects sirens and visual identification of emergency vehicles
  - Automatically adjusts signals to create green corridors

- ✅ **Live Traffic Congestion Heatmap**
  - Visualizes congestion levels across the monitored area
  - Helps users identify and avoid traffic hotspots

- ✅ **Alternate Route Recommendations**
  - Suggests optimal alternative routes during heavy traffic
  - Integrates with MapMyIndia for accurate navigation

- ✅ **Traffic Flow Predictions**
  - Analyzes historical data to predict future congestion patterns
  - Enables proactive traffic management strategies

## 🔧 Technical Architecture

### Components Overview

1. **Data Collection Layer**
   - CCTV cameras & drones capture live video feeds
   - Microphone sensors detect emergency vehicle sirens
   - IoT devices (Raspberry Pi & Arduino) process sensor inputs

2. **AI Processing Layer**
   - YOLOv8 for vehicle detection and classification
   - DeepSORT for vehicle tracking
   - OpenCV for image processing
   - Flask for API management

3. **Backend Processing**
   - MongoDB for data storage
   - WebSocket for real-time communication
   - Traffic analysis algorithms

4. **Frontend Dashboard**
   - React-based responsive interface
   - Real-time traffic analytics visualization
   - MapMyIndia integration for geospatial display

5. **Signal Control System**
   - Priority-based signal switching for emergency vehicles
   - Adaptive traffic light control based on congestion analysis

## 💻 Technology Stack

### Frontend
- **React** - UI library for building the dashboard
- **MapMyIndia SDK** - For maps integration and geospatial visualization
- **WebSocket** - For real-time communication with the backend

### Backend
- **Flask** - Python web framework for the API
- **MongoDB** - Database for storing traffic data and patterns
- **WebSocket** - For real-time data transmission

### AI & Computer Vision
- **YOLOv8** - For real-time object detection
- **DeepSORT** - For object tracking
- **OpenCV** - For image processing
- **Python** - Primary programming language

### Hardware
- **Raspberry Pi** - For edge computing and signal control
- **Arduino** - For sensor integration
- **CCTV Cameras** - For traffic monitoring

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js and npm
- MongoDB
- MapMyIndia API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArshTiwari2004/Waygen.git
   cd Waygen
   ```
2. **Setup Frontend**
    ```bash
    cd traffic-monitoring/frontend
    npm install
    ```
3. **Create a .env file in the root of the frontend directory with:**
    ```bash
    VITE_MAPPLS_SDK_KEY=your_mapmy_india_sdk_key
    ```
4. **Start the development server:**
    ```
    npm run dev
    ```
5.  **Setup Backend - Create and activate a virtual environment:**
    ```
    python -m venv venv
    venv\Scripts\activate  # Windows
    source venv/bin/activate  # Linux/Mac
    ```
6. **Install the required packages:**
    ```
    pip install -r requirements.txt
    ```
7. **Start the Flask server:**
    ```
    python backend/flask_api.py
    ```

# Project Structure
```markdown
Waygen/
├── .git/
├── .ipynb_checkpoints/
├── .vscode/
├── traffic-monitoring/
│ ├── backend/
│ ├── data/
│ ├── frontend/
│ ├── notebooks/
│ ├── simulation/
│ └── yolov8n.pt
└── README.md
```

## 🔮 Future Enhancements

- AI-powered license plate recognition 
- Reinforcement learning can optimize signal patterns dynamically based on historical and real-time traffic flow
- Detect accidents or vehicle breakdowns.


## 🤝 Contributing
#### Contributions are welcome! Please feel free to submit a Pull Request.

- Fork the repository
- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request
