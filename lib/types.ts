// Type definitions for PaperShift AI

/**
 * Bounding box label types for OCR results
 */
export type BboxLabelType = 'title' | 'text' | 'table' | 'image' | 'header';

/**
 * Bounding box coordinates and metadata
 */
export interface BoundingBox {
  id: string;
  type: BboxLabelType;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text?: string;
  confidence?: number;
}

/**
 * OCR result from API
 */
export interface OcrResult {
  id: string;
  markdown: string;
  html: string;
  json: Record<string, any>;
  boundingBoxes: BoundingBox[];
  metadata: {
    pageCount: number;
    processingTime: number;
    language?: string;
  };
}

/**
 * Processing progress update
 */
export interface ProcessingProgress {
  progress: number; // 0-100
  eta?: number; // seconds
  message?: string;
}

/**
 * User signup data
 */
export interface SignupData {
  email: string;
  name: string;
  useCase: string;
  useCaseOther?: string;
  company?: string;
}

/**
 * Survey response data
 */
export interface SurveyData {
  userId: string;
  whatBuilding: string;
  documentTypes: string[];
  languages: string[];
  currentSolution: string;
  makeItPerfect: string;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  documentsProcessed: number;
  remainingQuota: number;
  successRate: number;
  avgProcessingTime: number;
}

/**
 * Recent document metadata
 */
export interface RecentDocument {
  id: string;
  filename: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'processing';
  pageCount: number;
}

/**
 * Dashboard data
 */
export interface DashboardData {
  apiKey: string;
  stats: DashboardStats;
  recentDocuments: RecentDocument[];
}

/**
 * Use case options for signup
 */
export const USE_CASE_OPTIONS = [
  'RAG / Document Q&A System',
  'AI Agent / Automation',
  'Document Processing Pipeline',
  'Research / Analysis Tool',
  'No-Code Workflow (Make.com/Zapier)',
  'Other',
] as const;

export type UseCase = typeof USE_CASE_OPTIONS[number];
