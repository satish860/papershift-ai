// API client for PaperShift AI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const OCR_API_URL = 'https://ocr-deployment-production.up.railway.app';

/**
 * Transform Railway API response to our OcrResult format
 */
function transformOcrResponse(apiResponse: any): any {
  // Transform layout_blocks to boundingBoxes
  // Use bbox (original pixels) not bbox_normalized for SVG viewBox approach
  const boundingBoxes = (apiResponse.metadata?.layout_blocks || []).map((block: any, index: number) => {
    const [x0, y0, x1, y1] = block.bbox || [0, 0, 0, 0];
    return {
      id: `bbox-${index}`,
      type: block.label?.toLowerCase() || 'text',
      coordinates: {
        x: x0,
        y: y0,
        width: x1 - x0,
        height: y1 - y0,
      },
      text: block.content?.replace(/<[^>]*>/g, '') || '', // Strip HTML tags
      confidence: block.confidence || 1.0,
    };
  });

  return {
    id: `ocr-${Date.now()}`,
    markdown: apiResponse.markdown || '',
    html: apiResponse.html || '',
    json: apiResponse,
    boundingBoxes,
    imageDimensions: apiResponse.metadata?.image_dimensions,
    metadata: {
      pageCount: apiResponse.metadata?.total_pages || 1,
      processingTime: apiResponse.processing_time || 0,
      language: apiResponse.metadata?.language || 'unknown',
    },
  };
}

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
 * Process document from URL with streaming (Railway API)
 * Supports both images and PDFs
 */
export async function processDocumentFromUrl(
  documentUrl: string,
  onProgress: (progress: number, eta?: number, message?: string) => void,
  onComplete: (result: any) => void,
  onError: (error: Error) => void
) {
  try {
    // Determine if it's an image or PDF based on URL extension
    const isImage = /\.(png|jpg|jpeg)$/i.test(documentUrl);
    const endpoint = isImage
      ? `${OCR_API_URL}/api/v1/ocr/image/url`
      : `${OCR_API_URL}/api/v1/ocr/pdf/url/stream`;

    const requestBody = isImage
      ? { url: documentUrl, extract_images: true }
      : { url: documentUrl, dpi: 200, batch_size: 3, extract_images: true };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OCR processing failed: ${errorText}`);
    }

    // For images, no streaming - just return the result
    if (isImage) {
      const apiResult = await response.json();
      const transformedResult = transformOcrResponse(apiResult);
      onProgress(100, 0, 'Complete');
      onComplete(transformedResult);
      return;
    }

    // For PDFs, handle Server-Sent Events stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.event === 'progress') {
              // Convert progress percentage to number (0-100)
              const progress = data.progress || 0;
              const eta = data.eta;
              const message = data.message || 'Processing...';
              onProgress(progress, eta, message);
            } else if (data.event === 'page') {
              // Page completed
              console.log('Page completed:', data.page_number);
            } else if (data.event === 'complete') {
              const transformedResult = transformOcrResponse(data.result);
              onProgress(100, 0, 'Complete');
              onComplete(transformedResult);
            } else if (data.event === 'error') {
              onError(new Error(data.message || 'Processing failed'));
            }
          } catch (parseError) {
            console.error('Error parsing SSE data:', parseError, line);
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
