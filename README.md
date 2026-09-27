# ABB Multimodal Maintenance Intelligence Agent

An industrial AI assistant built for the **ABB Hackathon** that ingests technical manuals, scanned documents, troubleshooting tables, and machine telemetry data to provide grounded, citation-backed maintenance guidance.

---

## 4 Core Datasets & AI/ML Models

The project is explicitly focused on 4 domain-specific datasets, mapping directly to 4 core AI model components:

| # | Dataset | Model Component | System Role |
|---|---|---|---|
| **1** | **AI4I 2020 Predictive Maintenance** | Model 4: Industrial Predictive Maintenance | Evaluates machine telemetry (temperature, RPM, torque, tool wear) and predicts machine failure modes & health scores |
| **2** | **DocLayNet** | Model 2: Document Layout Understanding | Identifies text, headers, titles, tables, figures, and captions across complex industrial manual layouts |
| **3** | **TableBank** | Model 3: Table Detection & Extraction | Detects and extracts troubleshooting grids, error-code lookup tables, and specification matrices from PDFs |
| **4** | **FUNSD** | Model 1: OCR & Noisy Scanned Document Model | Performs OCR and structured text extraction on scanned, noisy, or low-quality maintenance forms |

---

## Multimodal Pipeline Architecture

```
[ Industrial PDF / Scanned Manual ]    [ Machine Sensor Telemetry CSV ]
                 │                                    │
                 ▼                                    ▼
       ┌──────────────────┐                 ┌──────────────────┐
       │ FUNSD OCR Model  │                 │ AI4I Predictive  │
       │ DocLayNet Layout │                 │ Maintenance Model│
       │ TableBank Table  │                 └─────────┬────────┘
       └─────────┬────────┘                           │
                 │                                    │
                 ▼                                    │
    [ Document Ingestion Pipeline ]                   │
    [ Hybrid Vector DB & Graph DB ] ◄─────────────────┘
                 │
                 ▼
    [ Multimodal RAG Engine (Gemini API) ]
                 │
                 ▼
    [ Grounded Citation Answer & Evidence Viewer ]
```

---

## Project Structure

```
abb-maintenance-intelligence/
├── frontend/             # React + TypeScript + Vite + Tailwind CSS UI
│   ├── src/pages/        # 11 Enterprise Pages (Landing, Dashboard, Assistant, Evidence, etc.)
│   └── src/components/   # Modular UI components
├── backend/              # FastAPI Async REST API
│   ├── app/api/routes/   # Document, Chat, Machine, Evidence, Graph, Model routes
│   ├── app/database/     # PostgreSQL, Qdrant Vector DB, Neo4j Knowledge Graph
│   └── app/services/     # RAG, OCR, Layout, Table, Maintenance Inference services
├── ml/                   # Machine Learning Workflows
│   ├── datasets/         # AI4I, DocLayNet, TableBank, FUNSD datasets
│   ├── preprocessing/    # Dataset preprocessing scripts
│   ├── training/         # Model fine-tuning & training scripts
│   ├── evaluation/       # Evaluation metrics scripts
│   └── inference/        # Inference engines
├── documents/            # Sample technical manuals & SOP documents
├── data/raw/             # Sample telemetry CSV files
└── docs/                 # Architecture, API, Dataset, Model Cards documentation
```

---

## Quick Start Guide

### 1. Preprocess & Train Models
```bash
# Preprocess AI4I 2020 dataset
python ml/preprocessing/maintenance_preprocessing.py

# Train AI4I Predictive Maintenance model
python ml/training/train_maintenance.py --fast

# Evaluate trained model
python ml/evaluation/evaluate_maintenance.py
```

### 2. Run FastAPI Backend
From project root:
```bash
python -m uvicorn backend.app.main:app --reload
```
Or from inside `backend/` folder:
```bash
cd backend
python -m uvicorn app.main:app --reload
```
API Health Check: `http://127.0.0.1:8000/api/health`

### 3. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend URL: `http://localhost:5173`
