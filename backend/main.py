# main.py
from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from models import OptimizationRequest, OptimizationResponse
from optimizer import HybridOptimizationEngine

load_dotenv()

app = FastAPI()
api = APIRouter(prefix="/api")

# --- Middleware ---
# This allows your frontend to talk to this API in deployed and local envs
# Configure allowed origins via env var: BACKEND_ALLOWED_ORIGINS (comma-separated)
raw_origins = os.getenv("BACKEND_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174").strip()
origins = [o.strip() for o in raw_origins.split(",") if o.strip()]

allow_credentials = os.getenv("BACKEND_ALLOW_CREDENTIALS", "false").lower() == "true"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
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

# --- Duplicate routes under /api for Platform routing ---
@api.get("/")
def read_root_api():
    return read_root()

@api.post("/optimize", response_model=OptimizationResponse)
def run_optimization_api(request: OptimizationRequest):
    return run_optimization(request)

app.include_router(api)