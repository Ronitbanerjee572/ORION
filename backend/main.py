# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import OptimizationRequest, OptimizationResponse
from optimizer import HybridOptimizationEngine

app = FastAPI()

# --- Middleware ---
# This allows your React app (running on a different port) to talk to this API
origins = [
    "http://localhost:3000", # Default React dev server
    "http://localhost:5173", # Default Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Train Optimizer API is running"}

@app.post("/optimize", response_model=OptimizationResponse)
def run_optimization(request: OptimizationRequest):
    """
    Receives train and resource data, runs the optimizer,
    and returns the optimized schedule and KPIs.
    """
    engine = HybridOptimizationEngine(request)
    result = engine.generate_optimized_schedule()
    return result