from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
import time

from app.routes import detection, health
from app.services.model_service import ModelService
from app.services.database import Database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    logger.info("Loading EfficientNet-B4 disease detection model...")
    await ModelService.load_model()
    await Database.connect()
    logger.info("Detection service ready.")
    yield
    # Shutdown
    await Database.disconnect()
    logger.info("Detection service shut down.")


app = FastAPI(
    title="PDDS Detection Service",
    description="Plant disease detection using EfficientNet-B4 CNN",
    version="1.0.0",
    lifespan=lifespan,
)

# ─── CORS ─────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gateway handles auth; restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Request Timing ───────────────────────────────────────
@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers["X-Process-Time"] = f"{(time.time() - start) * 1000:.2f}ms"
    return response

# ─── Routes ───────────────────────────────────────────────
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(detection.router, prefix="/detect", tags=["detection"])

# ─── Global Exception Handler ─────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal server error"},
    )
