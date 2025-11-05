// API client for PaperShift AI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Process a document with OCR
 */
export async function processDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/ocr/process`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to process document');
  }

  return response.json();
}

/**
 * Process document with streaming (Server-Sent Events)
 */
export async function processDocumentStream(
  file: File,
  onProgress: (progress: number, eta?: number) => void,
  onComplete: (result: any) => void,
  onError: (error: Error) => void
) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/ocr/stream`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to start document processing');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));

          if (data.type === 'progress') {
            onProgress(data.progress, data.eta);
          } else if (data.type === 'complete') {
            onComplete(data.result);
          } else if (data.type === 'error') {
            onError(new Error(data.message));
          }
        }
      }
    }
  } catch (error) {
    onError(error as Error);
  }
}

/**
 * Get example documents
 */
export async function getExampleDocuments() {
  const response = await fetch(`${API_BASE_URL}/api/samples`);

  if (!response.ok) {
    throw new Error('Failed to fetch example documents');
  }

  return response.json();
}

/**
 * User signup
 */
export async function signup(data: {
  email: string;
  name: string;
  useCase: string;
  useCaseOther?: string;
  company?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json();
}

/**
 * Submit survey responses
 */
export async function submitSurvey(data: {
  userId: string;
  whatBuilding: string;
  documentTypes: string[];
  languages: string[];
  currentSolution: string;
  makeItPerfect: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit survey');
  }

  return response.json();
}

/**
 * Get dashboard data (usage stats, recent documents)
 */
export async function getDashboardData(apiKey: string) {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json();
}
