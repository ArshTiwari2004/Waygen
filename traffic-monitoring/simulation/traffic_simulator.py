import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.animation as animation
import numpy as np
import time
import random
import cv2
from matplotlib.lines import Line2D

class TrafficSimulator:
    def __init__(self, controller=None, detector=None):
        """
        Initialize the traffic simulator
        
        Args:
            controller: TrafficSignalController instance
            detector: TrafficDetector instance
        """
        self.controller = controller
        self.detector = detector
        
        # Set up the figure and axes
        self.fig, self.ax = plt.subplots(figsize=(12, 10))
        self.fig.suptitle('Intelligent Traffic Management System', fontsize=16)
        
        # Set up the road
        self.road_width = 40
        self.lane_width = 20
        self.road_length = 200
        self.intersection_size = 60
        
        # Set up the vehicles
        self.vehicles = {
            1: [],  # Vehicles in lane 1 (North)
            2: [],  # Vehicles in lane 2 (East)
            3: [],  # Vehicles in lane 3 (South)
            4: []   # Vehicles in lane 4 (West)
        }
        
        # Vehicle counts
        self.vehicle_counts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        }
        
        # Ambulance presence
        self.has_ambulance = {
            1: False,
            2: False,
            3: False,
            4: False
        }
        
        # Traffic signal states
        self.signal_states = {
            1: 'red',
            2: 'red',
            3: 'red',
            4: 'green'
        }
        
        # Time allocated to each signal
        self.signal_times = {
            1: 0,
            2: 0,
            3: 0,
            4: 10
        }
        
        # Vehicle generation probabilities (vehicles per second)
        self.vehicle_gen_probs = {
            1: 0.3,
            2: 0.4,
            3: 0.2,
            4: 0.3
        }
        
        # Setup animation
        self.ani = None
        self.time_elapsed = 0
        self.frame_count = 0
        
        # Result window data
        self.result_frames = {
            1: {'vehicles': 0, 'time': 0},
            2: {'vehicles': 0, 'time': 0},
            3: {'vehicles': 0, 'time': 0},
            4: {'vehicles': 0, 'time': 0}
        }
        
        # Detection zone coordinates
        self.detection_zones = {
            1: [0, -self.road_length, self.road_width, self.road_length - self.intersection_size/2],  # North
            2: [self.intersection_size/2, 0, self.road_length - self.intersection_size/2, self.road_width],  # East
            3: [0, self.intersection_size/2, self.road_width, self.road_length - self.intersection_size/2],  # South
            4: [-self.road_length, 0, self.road_length - self.intersection_size/2, self.road_width]   # West
        }
    
    def _draw_road(self):
        """Draw the road on the axis"""
        # Clear the axis
        self.ax.clear()
        
        # Set limits
        self.ax.set_xlim(-self.road_length, self.road_length)
        self.ax.set_ylim(-self.road_length, self.road_length)
        
        # Draw horizontal road
        self.ax.add_patch(patches.Rectangle(
            (-self.road_length, -self.road_width/2),
            2 * self.road_length,
            self.road_width,
            color='gray'
        ))
        
        # Draw vertical road
        self.ax.add_patch(patches.Rectangle(
            (-self.road_width/2, -self.road_length),
            self.road_width,
            2 * self.road_length,
            color='gray'
        ))
        
        # Draw center lines
        self.ax.add_line(Line2D(
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2, 
             self.intersection_size/2, self.road_length],
            [0, 0, 0, 0, 0, 0],
            color='yellow',
            linestyle='--'
        ))
        self.ax.add_line(Line2D(
            [0, 0, 0, 0, 0, 0],
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2,
             self.intersection_size/2, self.road_length],
            color='yellow',
            linestyle='--'
        ))
        
        # Draw lane dividers
        self.ax.add_line(Line2D(
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2, 
             self.intersection_size/2, self.road_length],
            [-self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2],
            color='white'
        ))
        self.ax.add_line(Line2D(
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2, 
             self.intersection_size/2, self.road_length],
            [self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2],
            color='white'
        ))
        self.ax.add_line(Line2D(
            [-self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2, -self.road_width/2],
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2, 
             self.intersection_size/2, self.road_length],
            color='white'
        ))
        self.ax.add_line(Line2D(
            [self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2, self.road_width/2],
            [-self.road_length, -self.intersection_size/2, -self.intersection_size/2, self.intersection_size/2, 
             self.intersection_size/2, self.road_length],
            color='white'
        ))
        
        # Draw traffic lights
        self._draw_traffic_lights()
        
        # Draw detection zones (for debugging)
        self._draw_detection_zones()
        
        # Draw time elapsed
        self.ax.text(
            self.road_length - 50, 
            self.road_length - 20, 
            f"Time Elapsed: {int(self.time_elapsed)}",
            fontsize=12,
            bbox=dict(facecolor='white', alpha=0.7)
        )
    
    def _draw_traffic_lights(self):
        """Draw traffic lights on the simulation"""
        # Traffic light positions
        positions = {
            1: (-self.road_width/2 - 15, -self.intersection_size/2 - 15),  # North
            2: (self.intersection_size/2 + 15, -self.road_width/2 - 15),   # East
            3: (self.road_width/2 + 15, self.intersection_size/2 + 15),    # South
            4: (-self.intersection_size/2 - 15, self.road_width/2 + 15)    # West
        }
        
        # Draw traffic lights
        for lane_id, pos in positions.items():
            color = 'red'
            if self.signal_states[lane_id] == 'green':
                color = 'green'
            elif self.signal_states[lane_id] == 'yellow':
                color = 'yellow'
                
            # Draw signal
            self.ax.add_patch(patches.Circle(
                pos,
                5,
                color=color
            ))
            
            # Draw signal info
            self.ax.text(
                pos[0] - 10,
                pos[1] + 10,
                f"{lane_id}",
                fontsize=12
            )
            
            # Draw time remaining
            self.ax.text(
                pos[0] - 25,
                pos[1] + 25,
                f"Time: {int(self.signal_times[lane_id])}s",
                fontsize=8
            )
            
            # Draw vehicle count
            self.ax.text(
                pos[0] - 25,
                pos[1] + 35,
                f"Vehicles: {self.vehicle_counts[lane_id]}",
                fontsize=8
            )
            
            # Indicate if ambulance present
            if self.has_ambulance[lane_id]:
                self.ax.text(
                    pos[0] - 25,
                    pos[1] + 45,
                    "AMBULANCE!",
                    fontsize=8,
                    color='red'
                )
    
    def _draw_detection_zones(self):
        """Draw detection zones for debugging"""
        for lane_id, zone in self.detection_zones.items():
            x, y, width, height = zone
            self.ax.add_patch(patches.Rectangle(
                (x, y),
                width,
                height,
                fill=False,
                edgecolor='blue',
                linestyle='--'
            ))
    
    def _draw_vehicles(self):
        """Draw vehicles on the simulation"""
        for lane_id, vehicles in self.vehicles.items():
            for vehicle in vehicles:
                x, y = vehicle['position']
                width = vehicle['width']
                length = vehicle['length']
                color = vehicle['color']
                
                # Adjust rectangle position based on lane orientation
                if lane_id in [1, 3]:  # North or South
                    self.ax.add_patch(patches.Rectangle(
                        (x - width/2, y - length/2),
                        width,
                        length,
                        color=color,
                        angle=0 if lane_id == 3 else 180
                    ))
                else:  # East or West
                    self.ax.add_patch(patches.Rectangle(
                        (x - length/2, y - width/2),
                        length,
                        width,
                        color=color,
                        angle=90 if lane_id == 2 else 270
                    ))
    
    def _generate_vehicles(self):
        """Generate new vehicles at the edges of the simulation"""
        for lane_id in range(1, 5):
            # Skip if probability condition not met
            if random.random() > self.vehicle_gen_probs[lane_id]:
                continue
                
            # Determine if this is an ambulance (small probability)
            is_ambulance = random.random() < 0.01
            
            # Vehicle properties
            vehicle = {
                'width': 10,
                'length': 15,
                'color': 'red' if is_ambulance else random.choice(['blue', 'green', 'black', 'purple']),
                'speed': random.uniform(1.0, 2.0),
                'is_ambulance': is_ambulance,
                'in_intersection': False
            }
            
            # Set position based on lane
            if lane_id == 1:  # North
                vehicle['position'] = (random.uniform(-self.road_width/2 + 5, 0 - 5), -self.road_length)
                vehicle['direction'] = (0, 1)
            elif lane_id == 2:  # East
                vehicle['position'] = (self.road_length, random.uniform(-self.road_width/2 + 5, 0 - 5))
                vehicle['direction'] = (-1, 0)
            elif lane_id == 3:  # South
                vehicle['position'] = (random.uniform(0 + 5, self.road_width/2 - 5), self.road_length)
                vehicle['direction'] = (0, -1)
            elif lane_id == 4:  # West
                vehicle['position'] = (-self.road_length, random.uniform(0 + 5, self.road_width/2 - 5))
                vehicle['direction'] = (1, 0)
            
            # Add to vehicles list
            self.vehicles[lane_id].append(vehicle)
            
            # Update ambulance flag
            if is_ambulance:
                self.has_ambulance[lane_id] = True
    
    def _move_vehicles(self):
        """Move vehicles and handle traffic signals"""
        for lane_id in range(1, 5):
            signal_state = self.signal_states[lane_id]
            
            # List to keep track of vehicles that leave the simulation
            to_remove = []
            
            for i, vehicle in enumerate(self.vehicles[lane_id]):
                x, y = vehicle['position']
                dx, dy = vehicle['direction']
                speed = vehicle['speed']
                
                # Check if vehicle is at intersection
                at_intersection = False
                if lane_id == 1 and y > -self.intersection_size/2 - vehicle['length']:
                    at_intersection = True
                elif lane_id == 2 and x < self.intersection_size/2 + vehicle['length']:
                    at_intersection = True
                elif lane_id == 3 and y < self.intersection_size/2 + vehicle['length']:
                    at_intersection = True
                elif lane_id == 4 and x > -self.intersection_size/2 - vehicle['length']:
                    at_intersection = True
                
                # Check if vehicle is in intersection
                in_intersection = False
                if lane_id == 1 and y > -self.intersection_size/2 and y < self.intersection_size/2:
                    in_intersection = True
                elif lane_id == 2 and x < self.intersection_size/2 and x > -self.intersection_size/2:
                    in_intersection = True
                elif lane_id == 3 and y < self.intersection_size/2 and y > -self.intersection_size/2:
                    in_intersection = True
                elif lane_id == 4 and x > -self.intersection_size/2 and x < self.intersection_size/2:
                    in_intersection = True
                
                vehicle['in_intersection'] = in_intersection
                
                # Check if vehicle has left the simulation
                if (lane_id == 1 and y > self.road_length) or \
                   (lane_id == 2 and x < -self.road_length) or \
                   (lane_id == 3 and y < -self.road_length) or \
                   (lane_id == 4 and x > self.road_length):
                    to_remove.append(i)
                    continue
                
                # Handle traffic signals
                should_stop = False
                if signal_state == 'red' and at_intersection and not in_intersection:
                    should_stop = True
                elif signal_state == 'yellow' and at_intersection and not in_intersection:
                    # Slow down for yellow
                    speed = speed * 0.5
                
                # Check for vehicle in front
                for other_vehicle in self.vehicles[lane_id]:
                    if other_vehicle != vehicle:
                        other_x, other_y = other_vehicle['position']
                        
                        # Calculate distance based on lane direction
                        distance = 0
                        if lane_id == 1:  # North
                            if y < other_y and abs(x - other_x) < vehicle['width']:
                                distance = other_y - y - vehicle['length']
                        elif lane_id == 2:  # East
                            if x > other_x and abs(y - other_y) < vehicle['width']:
                                distance = x - other_x - vehicle['length']
                        elif lane_id == 3:  # South
                            if y > other_y and abs(x - other_x) < vehicle['width']:
                                distance = y - other_y - vehicle['length']
                        elif lane_id == 4:  # West
                            if x < other_x and abs(y - other_y) < vehicle['width']:
                                distance = other_x - x - vehicle['length']
                        
                        # Stop if too close
                        if 0 < distance < 20:
                            should_stop = True
                            break
                
                # Move the vehicle if not stopped
                if not should_stop:
                    new_x = x + dx * speed
                    new_y = y + dy * speed
                    vehicle['position'] = (new_x, new_y)
            
            # Remove vehicles that have left the simulation
            for i in sorted(to_remove, reverse=True):
                # If an ambulance is leaving, update the flag
                if self.vehicles[lane_id][i]['is_ambulance']:
                    self.has_ambulance[lane_id] = False
                
                # Remove the vehicle
                self.vehicles[lane_id].pop(i)
    
    def _update_vehicle_counts(self):
        """Update the count of vehicles in each lane"""
        for lane_id in range(1, 5):
            # Count vehicles in detection zone
            count = 0
            zone = self.detection_zones[lane_id]
            zone_x, zone_y, zone_width, zone_height = zone
            
            for vehicle in self.vehicles[lane_id]:
                x, y = vehicle['position']
                
                # Check if vehicle is in detection zone
                if lane_id == 1:  # North
                    if zone_y < y < zone_y + zone_height and zone_x < x < zone_x + zone_width:
                        count += 1
                elif lane_id == 2:  # East
                    if zone_x < x < zone_x + zone_width and zone_y < y < zone_y + zone_height:
                        count += 1
                elif lane_id == 3:  # South
                    if zone_y < y < zone_y + zone_height and zone_x < x < zone_x + zone_width:
                        count += 1
                elif lane_id == 4:  # West
                    if zone_x < x < zone_x + zone_width and zone_y < y < zone_y + zone_height:
                        count += 1
            
            self.vehicle_counts[lane_id] = count
    
    def _update_signal_states(self):
        """Update traffic signal states based on timing or external controller"""
        # Decrement time for current green signal
        for lane_id in range(1, 5):
            if self.signal_states[lane_id] == 'green' or self.signal_states[lane_id] == 'yellow':
                self.signal_times[lane_id] -= 1
                
                # If time is up, change signal
                if self.signal_times[lane_id] <= 0:
                    if self.signal_states[lane_id] == 'green':
                        # Change to yellow
                        self.signal_states[lane_id] = 'yellow'
                        self.signal_times[lane_id] = 3  # Yellow duration
                    else:
                        # Change to red
                        self.signal_states[lane_id] = 'red'
                        
                        # Determine next green signal
                        next_lane = (lane_id % 4) + 1
                        
                        # Skip to next lane if no vehicles and no ambulance
                        while self.vehicle_counts[next_lane] == 0 and not self.has_ambulance[next_lane]:
                            next_lane = (next_lane % 4) + 1
                            
                            # Break if we've gone full circle
                            if next_lane == lane_id:
                                break
                        
                        # Set next lane to green
                        self.signal_states[next_lane] = 'green'
                        
                        # Calculate time based on vehicle count (minimum 10 seconds)
                        if self.controller:
                            # Use external controller if available
                            self.signal_times[next_lane] = self.controller.calculate_signal_time(
                                next_lane, 
                                self.vehicle_counts,
                                self.has_ambulance
                            )
                        else:
                            # Simple calculation: 5 seconds + 2 seconds per vehicle, max 30 seconds
                            self.signal_times[next_lane] = min(5 + self.vehicle_counts[next_lane] * 2, 30)
                            
                            # Increase time if ambulance present
                            if self.has_ambulance[next_lane]:
                                self.signal_times[next_lane] = max(self.signal_times[next_lane], 15)
        
        # Handle ambulance emergency override
        for lane_id in range(1, 5):
            if self.has_ambulance[lane_id] and self.signal_states[lane_id] == 'red':
                # Find current green signal
                current_green = None
                for i in range(1, 5):
                    if self.signal_states[i] == 'green':
                        current_green = i
                        break
                
                if current_green:
                    # Change current green to yellow if not already
                    if self.signal_states[current_green] != 'yellow':
                        self.signal_states[current_green] = 'yellow'
                        self.signal_times[current_green] = 3
        
        # Update results data
        for lane_id in range(1, 5):
            if self.signal_states[lane_id] == 'green':
                self.result_frames[lane_id]['vehicles'] += self.vehicle_counts[lane_id]
                self.result_frames[lane_id]['time'] += 1
    
    def update(self, frame):
        """Update the simulation for the animation"""
        self.frame_count += 1
        self.time_elapsed += 0.1  # Each frame is 0.1 seconds
        
        # Generate vehicles
        self._generate_vehicles()
        
        # Move vehicles
        self._move_vehicles()
        
        # Update vehicle counts in each lane
        self._update_vehicle_counts()
        
        # Update traffic signal states
        self._update_signal_states()
        
        # Draw everything
        self._draw_road()
        self._draw_vehicles()
        
        return self.ax,
    
    def run(self, frames=1000):
        """Run the simulation"""
        self.ani = animation.FuncAnimation(
            self.fig,
            self.update,
            frames=frames,
            interval=100,
            blit=True
        )
        plt.show()
    
    def get_results(self):
        """Get simulation results"""
        results = {}
        for lane_id in range(1, 5):
            lane_data = self.result_frames[lane_id]
            avg_time = 0
            if lane_data['vehicles'] > 0:
                avg_time = lane_data['time'] / lane_data['vehicles']
            
            results[lane_id] = {
                'total_vehicles': lane_data['vehicles'],
                'total_green_time': lane_data['time'],
                'avg_time_per_vehicle': avg_time
            }
        
        return results