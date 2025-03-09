import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from matplotlib.animation import FuncAnimation

class TrafficVisualizer:
    def __init__(self, simulator):
        """
        Initialize the traffic visualizer
        
        Args:
            simulator: TrafficSimulator instance
        """
        self.simulator = simulator
        self.fig_stats, self.ax_stats = plt.subplots(2, 2, figsize=(14, 10))
        self.fig_stats.suptitle('Traffic Statistics', fontsize=16)
        
        # Initialize data storage
        self.time_data = []
        self.vehicle_count_data = {1: [], 2: [], 3: [], 4: []}
        self.wait_time_data = {1: [], 2: [], 3: [], 4: []}
        self.signal_state_data = {1: [], 2: [], 3: [], 4: []}
        
    def update_stats(self, frame):
        """Update statistics plots"""
        # Update data
        self.time_data.append(self.simulator.time_elapsed)
        
        for lane_id in range(1, 5):
            self.vehicle_count_data[lane_id].append(self.simulator.vehicle_counts[lane_id])
            
            # Convert signal state to numeric value
            signal_value = 0
            if self.simulator.signal_states[lane_id] == 'green':
                signal_value = 2
            elif self.simulator.signal_states[lane_id] == 'yellow':
                signal_value = 1
                
            self.signal_state_data[lane_id].append(signal_value)
            
            # Calculate average wait time for vehicles in lane
            wait_time = 0
            vehicles_in_lane = len([v for v in self.simulator.vehicles[lane_id] 
                                   if not v['in_intersection']])
            if vehicles_in_lane > 0:
                wait_time = self.simulator.signal_times[lane_id] / vehicles_in_lane
                
            self.wait_time_data[lane_id].append(wait_time)
        
        # Clear and redraw all plots
        for ax in self.ax_stats.flatten():
            ax.clear()
        
        # Plot vehicle counts
        ax_count = self.ax_stats[0, 0]
        for lane_id in range(1, 5):
            ax_count.plot(self.time_data, self.vehicle_count_data[lane_id], 
                         label=f'Lane {lane_id}')
        ax_count.set_title('Vehicle Counts by Lane')
        ax_count.set_xlabel('Time (s)')
        ax_count.set_ylabel('Number of Vehicles')
        ax_count.legend()
        
        # Plot traffic signal states
        ax_signal = self.ax_stats[0, 1]
        for lane_id in range(1, 5):
            ax_signal.plot(self.time_data, self.signal_state_data[lane_id], 
                          label=f'Lane {lane_id}')
        ax_signal.set_title('Traffic Signal States')
        ax_signal.set_xlabel('Time (s)')
        ax_signal.set_ylabel('Signal State (0=Red, 1=Yellow, 2=Green)')
        ax_signal.set_yticks([0, 1, 2])
        ax_signal.set_yticklabels(['Red', 'Yellow', 'Green'])
        ax_signal.legend()
        
        # Plot wait times
        ax_wait = self.ax_stats[1, 0]
        for lane_id in range(1, 5):
            ax_wait.plot(self.time_data, self.wait_time_data[lane_id], 
                        label=f'Lane {lane_id}')
        ax_wait.set_title('Average Wait Time by Lane')
        ax_wait.set_xlabel('Time (s)')
        ax_wait.set_ylabel('Wait Time (s)')
        ax_wait.legend()
        
        # Plot traffic distribution
        ax_dist = self.ax_stats[1, 1]
        labels = ['Lane 1 (North)', 'Lane 2 (East)', 'Lane 3 (South)', 'Lane 4 (West)']
        values = [self.simulator.vehicle_counts[lane_id] for lane_id in range(1, 5)]
        ax_dist.pie(values, labels=labels, autopct='%1.1f%%')
        ax_dist.set_title('Current Traffic Distribution')
        
        self.fig_stats.tight_layout(rect=[0, 0, 1, 0.96])
        
        return self.ax_stats.flatten()
    
    def run_visualization(self, frames=1000):
        """Run the statistics visualization"""
        ani_stats = FuncAnimation(
            self.fig_stats,
            self.update_stats,
            frames=frames,
            interval=100,
            blit=False
        )
        plt.show()
    
    def plot_final_results(self):
        """Plot final simulation results"""
        results = self.simulator.get_results()
        
        fig, axs = plt.subplots(1, 3, figsize=(18, 6))
        fig.suptitle('Traffic Simulation Results', fontsize=16)
        
        # Plot total vehicles
        vehicles = [results[lane_id]['total_vehicles'] for lane_id in range(1, 5)]
        axs[0].bar(['North', 'East', 'South', 'West'], vehicles)
        axs[0].set_title('Total Vehicles Processed')
        axs[0].set_ylabel('Number of Vehicles')
        
        # Plot green time
        green_time = [results[lane_id]['total_green_time'] for lane_id in range(1, 5)]
        axs[1].bar(['North', 'East', 'South', 'West'], green_time)
        axs[1].set_title('Total Green Signal Time')
        axs[1].set_ylabel('Time (s)')
        
        # Plot avg time per vehicle
        avg_time = [results[lane_id]['avg_time_per_vehicle'] for lane_id in range(1, 5)]
        axs[2].bar(['North', 'East', 'South', 'West'], avg_time)
        axs[2].set_title('Average Time per Vehicle')
        axs[2].set_ylabel('Time (s)')
        
        plt.tight_layout(rect=[0, 0, 1, 0.96])
        plt.show()
        
        # Print numerical results
        print("\nSimulation Results:")
        print("==================")
        for lane_id, direction in enumerate(['North', 'East', 'South', 'West'], 1):
            print(f"\n{direction} Lane (Lane {lane_id}):")
            print(f"  Total vehicles processed: {results[lane_id]['total_vehicles']}")
            print(f"  Total green signal time: {results[lane_id]['total_green_time']:.1f} seconds")
            print(f"  Average time per vehicle: {results[lane_id]['avg_time_per_vehicle']:.2f} seconds")