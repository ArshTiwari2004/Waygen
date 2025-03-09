from flask import Flask, request, jsonify
import pandas as pd
import json
import os
import cv2
import numpy as np
from datetime import datetime
import threading
import time

# Import our traffic modules
from traffic_detection import TrafficDetector
from traffic_control import TrafficSignalController

app = Flask(__name__)

# Root endpoint to avoid 404 errors
@app.route('/')
def home():
    return jsonify({'message': 'Traffic Monitoring API is running'}), 200

# Initialize components
detector = TrafficDetector()
controller = TrafficSignalController()

# Data storage
data_file = 'backend/traffic_data.csv'
if not os.path.exists(data_file):
    df = pd.DataFrame(columns=[
        'timestamp', 'lane_id', 'vehicle_count', 'signal_state', 
        'signal_duration', 'has_ambulance'
    ])
    df.to_csv(data_file, index=False)

# Global simulation state
simulation_running = False
current_state = {
    'timestamp': datetime.now().isoformat(),
    'lanes': {
        1: {'vehicles': 0, 'signal': 'red', 'time': 0, 'ambulance': False},
        2: {'vehicles': 0, 'signal': 'red', 'time': 0, 'ambulance': False},
        3: {'vehicles': 0, 'signal': 'red', 'time': 0, 'ambulance': False},
        4: {'vehicles': 0, 'signal': 'green', 'time': 10, 'ambulance': False}
    }
}

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify(current_state)

@app.route('/api/update', methods=['POST'])
def update_status():
    data = request.json
    current_state['timestamp'] = datetime.now().isoformat()
    for lane_id, lane_data in data['lanes'].items():
        lane_id = int(lane_id)
        current_state['lanes'][lane_id]['vehicles'] = lane_data['vehicles']
        if 'ambulance' in lane_data:
            current_state['lanes'][lane_id]['ambulance'] = lane_data['ambulance']
    
    vehicle_counts = {lane_id: lane['vehicles'] for lane_id, lane in current_state['lanes'].items()}
    ambulance_presence = {lane_id: lane['ambulance'] for lane_id, lane in current_state['lanes'].items()}
    signal_updates = controller.update_signals(vehicle_counts, ambulance_presence)
    
    for lane_id, signal_data in signal_updates.items():
        current_state['lanes'][lane_id]['signal'] = signal_data['state']
        current_state['lanes'][lane_id]['time'] = signal_data['time']
    
    log_data(current_state)
    return jsonify({'status': 'success', 'state': current_state})

@app.route('/api/detect', methods=['POST'])
def detect_traffic():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    lane_id = int(request.form.get('lane_id', 1))
    results = detector.detect_vehicles(img, lane_id)
    return jsonify(results)

@app.route('/api/simulate', methods=['POST'])
def control_simulation():
    global simulation_running
    action = request.json.get('action', 'status')
    if action == 'start':
        simulation_running = True
        threading.Thread(target=run_simulation).start()
        return jsonify({'status': 'simulation started'})
    elif action == 'stop':
        simulation_running = False
        return jsonify({'status': 'simulation stopped'})
    else:
        return jsonify({'status': 'running' if simulation_running else 'stopped'})

@app.route('/api/data', methods=['GET'])
def get_data():
    if os.path.exists(data_file):
        df = pd.read_csv(data_file)
        start_time = request.args.get('start')
        end_time = request.args.get('end')
        lane_id = request.args.get('lane')
        if start_time:
            df = df[df['timestamp'] >= start_time]
        if end_time:
            df = df[df['timestamp'] <= end_time]
        if lane_id:
            df = df[df['lane_id'] == int(lane_id)]
        return jsonify(df.to_dict(orient='records'))
    else:
        return jsonify([])

def log_data(state):
    rows = []
    timestamp = state['timestamp']
    for lane_id, lane_data in state['lanes'].items():
        row = {
            'timestamp': timestamp,
            'lane_id': lane_id,
            'vehicle_count': lane_data['vehicles'],
            'signal_state': lane_data['signal'],
            'signal_duration': lane_data['time'],
            'has_ambulance': lane_data['ambulance']
        }
        rows.append(row)
    df = pd.DataFrame(rows)
    df.to_csv(data_file, mode='a', header=False, index=False)

def run_simulation():
    while simulation_running:
        for lane_id in range(1, 5):
            current_state['lanes'][lane_id]['vehicles'] = np.random.randint(0, 21)
            current_state['lanes'][lane_id]['ambulance'] = np.random.random() < 0.05
        vehicle_counts = {lane_id: lane['vehicles'] for lane_id, lane in current_state['lanes'].items()}
        ambulance_presence = {lane_id: lane['ambulance'] for lane_id, lane in current_state['lanes'].items()}
        signal_updates = controller.update_signals(vehicle_counts, ambulance_presence)
        for lane_id, signal_data in signal_updates.items():
            current_state['lanes'][lane_id]['signal'] = signal_data['state']
            current_state['lanes'][lane_id]['time'] = signal_data['time']
        current_state['timestamp'] = datetime.now().isoformat()
        log_data(current_state)
        time.sleep(5)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
