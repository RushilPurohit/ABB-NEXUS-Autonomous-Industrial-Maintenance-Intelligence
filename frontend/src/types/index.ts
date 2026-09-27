export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Document {
  id?: string;
  doc_id?: string;
  filename: string;
  file_type?: string;
  size: number;
  uploaded_at?: string;
  uploadDate?: string;
  status: 'processing' | 'ready' | 'failed' | 'Processing' | 'Ready' | 'Error';
  current_step?: string;
  progress?: number;
  page_count?: number;
  chunk_count?: number;
  table_count?: number;
  figure_count?: number;
  error?: string;
  type?: string;
  machine?: string;
  category?: string;
}

export interface Page {
  pageNumber: number;
  content: string;
  imageUrl?: string;
}

export interface Chunk {
  id: string;
  text: string;
  pageNumber: number;
  bbox?: number[];
}

export interface Citation {
  id?: string;
  chunk_id?: string;
  document_id?: string;
  documentId?: string;
  filename?: string;
  page_num?: number;
  pageNumber?: number;
  section?: string;
  confidence: number;
  text_snippet?: string;
  text?: string;
  bbox?: number[];
}

export interface Evidence {
  id: string;
  citation: Citation;
  explanation: string;
}

export interface QueryResponse {
  id?: string;
  answer: string;
  summary: string;
  likely_causes?: string[];
  likelyCauses?: string[];
  recommended_checks?: string[];
  recommendedChecks?: string[];
  step_by_step_action?: string[];
  machine_insight?: string;
  confidence: number;
  citations: Citation[];
}

export interface MachineHealth {
  machineId: string;
  healthScore: number;
  status: 'Healthy' | 'Warning' | 'Fault';
  lastUpdated: string;
}

export interface SensorData {
  timestamp: string;
  temperature: number;
  pressure: number;
  rpm: number;
  torque: number;
  toolWear: number;
}

export interface PredictionResult {
  status: 'Healthy' | 'Warning' | 'Fault';
  healthScore: number;
  predictedFault: string;
  confidence: number;
  recommendedInspection: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'Machine' | 'Fault' | 'Component' | 'Procedure';
  properties?: any;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ModelMetrics {
  name: string;
  cer?: number;
  wer?: number;
  map?: number;
  accuracy?: number;
  f1?: number;
  rocAuc?: number;
  status: 'Model trained' | 'Training pending';
  lossHistory: { epoch: number; trainLoss: number; valLoss: number }[];
}

export interface ProcessingStatus {
  doc_id?: string;
  documentId?: string;
  step?: string;
  currentStep?: string;
  progress: number;
  status?: string;
  page_count?: number;
  chunk_count?: number;
  table_count?: number;
  figure_count?: number;
  error?: string;
}
