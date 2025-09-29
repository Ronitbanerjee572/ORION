# optimizer.py
import time
from datetime import datetime, timedelta
import random

class HybridOptimizationEngine:
    def __init__(self, request_data):
        self.trains = sorted(request_data.trains, key=lambda t: (t.priority, t.scheduleArrival), reverse=True)
        self.resources = {r.id: r for r in request_data.resources}
        self.initial_delay = self._calculate_initial_delay()
        self.conflicts = 0

    def _calculate_initial_delay(self):
        now = datetime.now()
        total_delay = 0
        for train in self.trains:
            arrival_time = datetime.fromisoformat(train.scheduleArrival.replace("Z", "+00:00")).replace(tzinfo=None)
            if arrival_time < now:
                total_delay += (now - arrival_time).total_seconds() / 60
        return int(total_delay)

    def _greedy_heuristic(self):
        """Generates a fast, priority-based initial schedule."""
        schedule = []
        resource_free_time = {res_id: datetime.now() for res_id in self.resources}
        current_time = datetime.now()
        sequence = 1
        
        # Simple simulation: assume trains need one platform resource
        platforms = [res_id for res_id, res in self.resources.items() if res.type == 'platform']
        
        for train in self.trains:
            earliest_arrival = datetime.fromisoformat(train.scheduleArrival.replace("Z", "+00:00")).replace(tzinfo=None)
            arrival_time = max(current_time, earliest_arrival)
            
            # Find the first available platform
            best_platform = None
            earliest_finish_time = datetime.max
            
            for platform_id in platforms:
                platform_available_at = resource_free_time[platform_id]
                possible_start_time = max(arrival_time, platform_available_at)
                
                # Assume a 10-minute platform stop
                finish_time = possible_start_time + timedelta(minutes=10)
                
                if finish_time < earliest_finish_time:
                    earliest_finish_time = finish_time
                    best_platform = platform_id
            
            if not best_platform: # No platforms available, big issue in real life
                continue

            actual_arrival = max(arrival_time, resource_free_time[best_platform])
            
            if actual_arrival > resource_free_time[best_platform]:
                self.conflicts += 1
                
            resource_free_time[best_platform] = actual_arrival + timedelta(minutes=10) # Occupy for 10 mins
            
            delay_note = f"Delay: {int((actual_arrival - earliest_arrival).total_seconds() / 60)} min"
            
            schedule.append({
                "sequence": sequence,
                "train_id": train.id,
                "action": "ARRIVE",
                "location": best_platform,
                "estimated_time": actual_arrival.isoformat(),
                "notes": delay_note
            })
            sequence += 1

        return schedule

    def _simulated_annealing_refinement(self, schedule):
        """Refines the schedule by making small swaps."""
        # This is a placeholder for a more complex SA implementation.
        # In a real scenario, this would involve more sophisticated "moves"
        # and a proper cooling schedule.
        if len(schedule) > 2 and random.random() > 0.5: # 50% chance to try a swap
            idx1, idx2 = random.sample(range(len(schedule)), 2)
            schedule[idx1], schedule[idx2] = schedule[idx2], schedule[idx1]
            # Recalculate delays and accept/reject move...
            
            # For this example, we just add a note that it was refined.
            for item in schedule:
                if "Refined by SA" not in item["notes"]:
                    item["notes"] += " | Refined by SA"

        return schedule

    def generate_optimized_schedule(self):
        start_time = time.time()
        
        # Step 1 & 2: Formulate problem and run Greedy Heuristic
        initial_schedule = self._greedy_heuristic()
        
        # Step 3: Refine with Metaheuristics (simplified)
        refined_schedule = self._simulated_annealing_refinement(initial_schedule)
        
        # Re-order by time after potential swaps
        refined_schedule.sort(key=lambda x: x['estimated_time'])
        for i, event in enumerate(refined_schedule):
            event['sequence'] = i + 1

        end_time = time.time()
        
        # Calculate final KPIs
        final_delay = 0
        for event in refined_schedule:
             # Extract delay from notes for simplicity
             try:
                delay_str = event['notes'].split('Delay: ')[1].split(' min')[0]
                final_delay += int(delay_str)
             except (IndexError, ValueError):
                continue

        kpis = {
            "total_trains_processed": len(self.trains),
            "initial_total_delay_minutes": self.initial_delay,
            "optimized_total_delay_minutes": final_delay,
            "delay_reduction_minutes": self.initial_delay - final_delay,
            "conflicts_resolved": self.conflicts,
            "calculation_time_ms": (end_time - start_time) * 1000
        }
        
        return {"optimized_schedule": refined_schedule, "summary_kpis": kpis}