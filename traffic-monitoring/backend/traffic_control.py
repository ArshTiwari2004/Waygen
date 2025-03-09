import time
import csv
import os
from datetime import datetime

class TrafficSignalController:
    def __init__(self, base_time=10, time_per_vehicle=2, max_green_time=60, min_green_time=10):
        """
        Initialize the traffic signal controller
        
        Args:
            base_time: Base time allocated to each lane in seconds
            time_per_vehicle: Additional time allocated per vehicle in seconds
            max_green_time: Maximum green time allowed for any lane
            min_green_time: Minimum green time for any lane
        """
        self.base_time = base_time
        self.time_per_vehicle = time_per_vehicle
        self.max_green_time = max_green_time
        self.min_green_time = min_green_time
        
        # Initialize lane states
        self.lane_states = {
            1: {'signal': 'red', 'time_remaining': 0, 'vehicles': 0, 'has_ambulance': False},
            2: {'signal': 'red', 'time_remaining': 0, 'vehicles': 0, 'has_ambulance': False},
            3: {'signal': 'red', 'time_remaining': 0, 'vehicles': 0, 'has_ambulance': False},
            4: {'signal': 'green', 'time_remaining': self.base_time, 'vehicles': 0, 'has_ambulance': False}
        }
        
        # Current active lane
        self.active_lane = 4
        
        # Last state change time
        self.last_state_change = time.time()
        
        # Initialize data logging
        self.data_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "traffic_data.csv")
        self._init_data_file()
        
    def _init_data_file(self):
        """Initialize data file if it doesn't exist"""
        if not os.path.exists(self.data_file):
            with open(self.data_file, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['timestamp', 'lane_id', 'vehicles', 'signal', 'time_allocated', 'has_ambulance'])
    
    def log_data(self, lane_id):
        """Log traffic data to CSV"""
        lane = self.lane_states[lane_id]
        with open(self.data_file, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                lane_id,
                lane['vehicles'],
                lane['signal'],
                lane['time_remaining'],
                lane['has_ambulance']
            ])
    
    def calculate_green_time(self, vehicle_count):
        """
        Calculate green time based on vehicle count
        
        Args:
            vehicle_count: Number of vehicles in the lane
            
        Returns:
            green_time: Calculated green time in seconds
        """
        # t = n * x + y
        green_time = (vehicle_count * self.time_per_vehicle) + self.base_time
        
        # Apply min and max constraints
        green_time = max(green_time, self.min_green_time)
        green_time = min(green_time, self.max_green_time)
        
        return green_time
    
    def update_lane_state(self, lane_id, vehicles_count, has_ambulance):
        """
        Update the state of a lane
        
        Args:
            lane_id: ID of the lane (1-4)
            vehicles_count: Number of vehicles in the lane
            has_ambulance: Boolean indicating if an ambulance is detected
        """
        self.lane_states[lane_id]['vehicles'] = vehicles_count
        self.lane_states[lane_id]['has_ambulance'] = has_ambulance
        
        # Log data after update
        self.log_data(lane_id)
        
    def update_signals(self, force_lane=None):
        """
        Update traffic signals based on current states
        
        Args:
            force_lane: If set, force this lane to be green (for ambulance priority)
            
        Returns:
            changed: Boolean indicating if signal state changed
            active_lane: ID of the currently active (green) lane
        """
        current_time = time.time()
        elapsed_time = current_time - self.last_state_change
        
        # Decrement time remaining for active lane
        self.lane_states[self.active_lane]['time_remaining'] -= elapsed_time
        
        changed = False
        
        # Check if there's an ambulance in any lane
        ambulance_lanes = [lane_id for lane_id, state in self.lane_states.items() 
                          if state['has_ambulance'] and state['signal'] == 'red']
        
        # Priority to forced lane (if specified)
        if force_lane is not None and force_lane != self.active_lane:
            self._switch_to_lane(force_lane)
            changed = True
        
        # Priority to lanes with ambulances
        elif ambulance_lanes and ambulance_lanes[0] != self.active_lane:
            self._switch_to_lane(ambulance_lanes[0])
            changed = True
            
        # Normal signal timing
        elif self.lane_states[self.active_lane]['time_remaining'] <= 0:
            # Time expired, switch to next lane
            next_lane = (self.active_lane % 4) + 1
            self._switch_to_lane(next_lane)
            changed = True
            
        # Update the last state change time
        self.last_state_change = current_time
        
        return changed, self.active_lane
    
    def _switch_to_lane(self, lane_id):
        """
        Switch active lane to the specified lane
        
        Args:
            lane_id: ID of the lane to switch to (1-4)
        """
        # Set all lanes to red
        for lane in self.lane_states:
            self.lane_states[lane]['signal'] = 'red'
            
        # Set the specified lane to green
        self.lane_states[lane_id]['signal'] = 'green'
        
        # Calculate green time for the new active lane
        vehicles = self.lane_states[lane_id]['vehicles']
        green_time = self.calculate_green_time(vehicles)
        
        # Set time remaining
        self.lane_states[lane_id]['time_remaining'] = green_time
        
        # Update active lane
        self.active_lane = lane_id
        
        # Log data after switch
        self.log_data(lane_id)
    
    def get_lane_states(self):
        """
        Get current states of all lanes
        
        Returns:
            states: Dictionary of lane states
        """
        return self.lane_states
    
    def get_formatted_states(self):
        """
        Get formatted states suitable for display
        
        Returns:
            formatted_states: Dictionary of formatted lane states
        """
        formatted_states = {}
        for lane_id, state in self.lane_states.items():
            formatted_states[lane_id] = {
                'signal': state['signal'],
                'time_remaining': int(state['time_remaining']),
                'vehicles': state['vehicles'],
                'has_ambulance': state['has_ambulance']
            }
        return formatted_states

if __name__ == "__main__":
    # Demo usage
    controller = TrafficSignalController()
    
    # Simulate updates
    controller.update_lane_state(1, 15, False)
    controller.update_lane_state(2, 8, False)
    controller.update_lane_state(3, 20, False)
    controller.update_lane_state(4, 5, False)
    
    # Get states
    states = controller.get_formatted_states()
    for lane_id, state in states.items():
        print(f"Lane {lane_id}: {state['signal']}, {state['time_remaining']}s, {state['vehicles']} vehicles")
    
    # Simulate time passing and update signals
    time.sleep(1)
    changed, active_lane = controller.update_signals()
    
    # Get updated states
    states = controller.get_formatted_states()
    for lane_id, state in states.items():
        print(f"Lane {lane_id}: {state['signal']}, {state['time_remaining']}s, {state['vehicles']} vehicles")