# models.py
from pydantic import BaseModel
from typing import List, Optional

class Train(BaseModel):
    id: str
    type: str
    priority: int
    scheduleArrival: str

class Resource(BaseModel):
    id: str
    type: str
    capacity: int
    length: int
    start_node: Optional[str] = None
    end_node: Optional[str] = None

class OptimizationRequest(BaseModel):
    trains: List[Train]
    resources: List[Resource]

# --- Output Models ---
class ScheduleEvent(BaseModel):
    sequence: int
    train_id: str
    action: str
    location: str
    estimated_time: str
    notes: str

class SummaryKPIs(BaseModel):
    total_trains_processed: int
    initial_total_delay_minutes: int
    optimized_total_delay_minutes: int
    delay_reduction_minutes: int
    conflicts_resolved: int
    calculation_time_ms: float

class OptimizationResponse(BaseModel):
    optimized_schedule: List[ScheduleEvent]
    summary_kpis: SummaryKPIs