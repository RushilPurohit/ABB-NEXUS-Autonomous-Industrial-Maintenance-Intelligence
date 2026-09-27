from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .database.postgres import create_tables
from .database.qdrant import qdrant_manager
from .database.neo4j import neo4j_manager

from .api.routes import documents, chat, machine, evidence, graph, models

app = FastAPI(title="ABB Maintenance Intelligence Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await create_tables()
    qdrant_manager.initialize_collections()

@app.on_event("shutdown")
async def shutdown_event():
    neo4j_manager.close()

@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "ABB Multimodal Maintenance Intelligence Agent"}

app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(machine.router, prefix="/api/machine", tags=["machine"])
app.include_router(evidence.router, prefix="/api/evidence", tags=["evidence"])
app.include_router(graph.router, prefix="/api/graph", tags=["graph"])
app.include_router(models.router, prefix="/api/models", tags=["models"])
