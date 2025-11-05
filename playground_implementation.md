# Playground Implementation Guide

## Overview

This document provides a step-by-step guide to building the OCR Playground - a dedicated `/playground` route where users can test the OCR API with an interactive demo interface.

**Status:** Ready for Implementation
**Estimated Time:** 2.5-3 hours total
**Target Completion:** Week 3

---

## Design Decisions (Approved)

- **Route:** Separate `/playground` route (dedicated full page)
- **Layout:** Fixed 50/50 split-screen (document left, results right)
- **Mobile:** Stacked layout (document on top, results below)
- **Navigation:** Accessible only via CTA buttons (not in nav bar)
- **Features:** Split-screen, bounding box overlay, example selector, result tabs

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  app/playground/page.tsx (Main Container)                   │
│  - Manages state (file, processing, result, error)          │
│  - Orchestrates API calls                                    │
│  - Coordinates child components                              │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
    ┌───────────────┐              ┌───────────────┐
    │  Left Panel   │              │  Right Panel  │
    │  (Upload +    │              │  (Results)    │
    │   Document)   │              │               │
    └───────────────┘              └───────────────┘
            │                               │
    ┌───────┴────────┐            ┌────────┴────────┐
    │                │            │                 │
    ▼                ▼            ▼                 ▼
FileUploader  DocumentViewer  ResultViewer   ProcessingStatus
    │                │                              │
    ▼                ▼                              ▼
ExampleSelector  BboxOverlay                   Progress Bar
```

---

## File Structure

### New Files to Create

```
app/
  playground/
    page.tsx                    # Main playground route (state container)

components/
  demo/
    PlaygroundLayout.tsx        # Split-screen container wrapper
    FileUploader.tsx            # Drag-drop upload + URL input
    ExampleSelector.tsx         # Pre-loaded sample document buttons
    ProcessingStatus.tsx        # Progress bar with ETA display
    DocumentViewer.tsx          # Left panel: image/PDF + bbox overlay
    ResultViewer.tsx            # Right panel: tabbed Markdown/HTML/JSON
```

### Files to Modify

```
components/landing/Hero.tsx           # Update "Try Demo" CTA → /playground
components/landing/Navigation.tsx     # Verify routing works (no new nav item)
lib/api.ts                            # Verify getExampleDocuments() exists
```

---

## State Management

### Main State (in playground/page.tsx)

```typescript
interface PlaygroundState {
  // Upload state
  file: File | null
  fileUrl: string | null

  // Processing state
  processing: boolean
  progress: ProcessingProgress | null

  // Result state
  result: OcrResult | null

  // Error state
  error: string | null
}
```

### State Flow

1. **Upload Phase:** User uploads file or selects example
   - `file` or `fileUrl` is set
   - `processing` = false
   - `result` = null

2. **Processing Phase:** API call in progress
   - `processing` = true
   - `progress` updates via SSE callbacks
   - UI shows progress bar + loading states

3. **Complete Phase:** OCR finished
   - `processing` = false
   - `result` populated with OcrResult
   - UI shows split-screen with document + results

4. **Error Phase:** Something failed
   - `processing` = false
   - `error` contains error message
   - UI shows error state with retry option

---

## Implementation Phases

### ✅ Phase 0: Preparation (5 min)
- [x] Create `playground_implementation.md` (this file)
- [ ] Create `components/demo/` directory
- [ ] Create `app/playground/` directory

---

### 📦 Phase 1: Basic Route & Upload (45 min)

**Goal:** Create playground route with file upload functionality

#### Step 1.1: Create Main Playground Route

**File:** `app/playground/page.tsx`

```typescript
"use client"

import { useState } from "react"
import { FileUploader } from "@/components/demo/FileUploader"
import { ExampleSelector } from "@/components/demo/ExampleSelector"
import { ProcessingStatus } from "@/components/demo/ProcessingStatus"
import { DocumentViewer } from "@/components/demo/DocumentViewer"
import { ResultViewer } from "@/components/demo/ResultViewer"
import { PlaygroundLayout } from "@/components/demo/PlaygroundLayout"
import { processDocumentStream } from "@/lib/api"
import type { OcrResult, ProcessingProgress } from "@/lib/types"

export default function PlaygroundPage() {
  // State management
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState<ProcessingProgress | null>(null)
  const [result, setResult] = useState<OcrResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle file upload
  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile)
    setFileUrl(URL.createObjectURL(uploadedFile))
    setError(null)
    setProcessing(true)
    setProgress(null)
    setResult(null)

    try {
      await processDocumentStream(
        uploadedFile,
        // onProgress
        (prog) => setProgress(prog),
        // onComplete
        (res) => {
          setResult(res)
          setProcessing(false)
        },
        // onError
        (err) => {
          setError(err.message || "Processing failed")
          setProcessing(false)
        }
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      setProcessing(false)
    }
  }

  // Handle example selection
  const handleExampleSelect = async (exampleUrl: string) => {
    // TODO: Implement example document loading
    console.log("Example selected:", exampleUrl)
  }

  // Handle retry
  const handleRetry = () => {
    setFile(null)
    setFileUrl(null)
    setResult(null)
    setError(null)
    setProgress(null)
    setProcessing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">OCR Playground</h1>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!file && !processing && !result && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Test OCR on Your Documents
              </h2>
              <p className="text-muted-foreground text-lg">
                Upload a document or try an example to see OCR in action
              </p>
            </div>

            <FileUploader onFileSelect={handleFileUpload} />
            <ExampleSelector onExampleSelect={handleExampleSelect} />
          </div>
        )}

        {(processing || result) && (
          <div className="space-y-4">
            {processing && <ProcessingStatus progress={progress} />}

            <PlaygroundLayout>
              <DocumentViewer
                imageUrl={fileUrl}
                boundingBoxes={result?.boundingBoxes || []}
              />
              <ResultViewer result={result} processing={processing} />
            </PlaygroundLayout>

            {result && (
              <div className="text-center">
                <button
                  onClick={handleRetry}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Upload another document
                </button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center">
              <p className="text-destructive font-medium mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
```

#### Step 1.2: Create FileUploader Component

**File:** `components/demo/FileUploader.tsx`

```typescript
"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, AlertCircle } from "lucide-react"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)

    if (rejectedFiles.length > 0) {
      setError("Please upload a valid PDF, PNG, or JPG file (max 100MB)")
      return
    }

    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative w-full p-12 border-2 border-dashed rounded-lg
          transition-all cursor-pointer
          ${isDragActive
            ? 'border-primary bg-primary/10 scale-[1.02]'
            : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4 text-center">
          {isDragActive ? (
            <>
              <File className="h-12 w-12 text-primary animate-pulse" />
              <p className="text-lg font-medium">Drop to upload</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  Drop file or click to upload
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PDF, PNG, JPG up to 100MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
```

#### Step 1.3: Create ExampleSelector Component

**File:** `components/demo/ExampleSelector.tsx`

```typescript
"use client"

import { Button } from "@/components/ui/button"

interface ExampleSelectorProps {
  onExampleSelect: (url: string) => void
}

const EXAMPLES = [
  {
    id: "hindi-receipt",
    label: "Hindi Receipt",
    url: "/examples/hindi-receipt.jpg",
    description: "Mixed Hindi/English receipt with stamps"
  },
  {
    id: "arabic-form",
    label: "Arabic Form",
    url: "/examples/arabic-form.pdf",
    description: "Arabic government form with signatures"
  },
  {
    id: "japanese-invoice",
    label: "Japanese Invoice",
    url: "/examples/japanese-invoice.pdf",
    description: "Japanese invoice with handwritten notes"
  },
  {
    id: "financial-pdf",
    label: "Financial PDF",
    url: "/examples/financial-report.pdf",
    description: "10-K report with complex tables"
  }
]

export function ExampleSelector({ onExampleSelect }: ExampleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Or try an example document:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAMPLES.map((example) => (
          <button
            key={example.id}
            onClick={() => onExampleSelect(example.url)}
            className="p-4 border border-border rounded-lg hover:border-primary hover:bg-card transition-all text-left group"
          >
            <div className="space-y-2">
              <p className="font-medium group-hover:text-primary transition-colors">
                {example.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {example.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Phase 1 Testing:**
- [ ] Navigate to `/playground` - page loads
- [ ] Drag and drop a file - uploader accepts it
- [ ] Click upload area - file picker opens
- [ ] Drop invalid file - shows error
- [ ] Click example button - logs URL to console

---

### 🎨 Phase 2: Layout & Progress (30 min)

**Goal:** Create split-screen layout and processing status

#### Step 2.1: Create PlaygroundLayout Component

**File:** `components/demo/PlaygroundLayout.tsx`

```typescript
"use client"

import { ReactNode } from "react"

interface PlaygroundLayoutProps {
  children: [ReactNode, ReactNode] // [DocumentViewer, ResultViewer]
}

export function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  const [leftPanel, rightPanel] = children

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[600px]">
      {/* Left Panel: Document Viewer */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {leftPanel}
      </div>

      {/* Right Panel: Result Viewer */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {rightPanel}
      </div>
    </div>
  )
}
```

#### Step 2.2: Create ProcessingStatus Component

**File:** `components/demo/ProcessingStatus.tsx`

```typescript
"use client"

import { Progress } from "@/components/ui/progress"
import type { ProcessingProgress } from "@/lib/types"

interface ProcessingStatusProps {
  progress: ProcessingProgress | null
}

export function ProcessingStatus({ progress }: ProcessingStatusProps) {
  if (!progress) {
    return (
      <div className="w-full space-y-2">
        <Progress value={0} className="h-1" />
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <span>Initializing...</span>
        </div>
      </div>
    )
  }

  const percentage = progress.percentage || 0
  const eta = progress.eta ? `${Math.ceil(progress.eta)}s` : "calculating..."

  return (
    <div className="w-full space-y-2 p-4 bg-card rounded-lg border border-border">
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          {progress.message || "Processing..."}
        </span>
        <span className="font-medium">
          {percentage}% • ETA: {eta}
        </span>
      </div>
    </div>
  )
}
```

**Phase 2 Testing:**
- [ ] Upload file - see layout split into two panels
- [ ] Processing starts - progress bar appears
- [ ] Progress bar shows percentage and ETA
- [ ] Mobile view - panels stack vertically

---

### 📄 Phase 3: Document Viewer (45 min)

**Goal:** Display document with interactive bounding box overlay

#### Step 3.1: Create DocumentViewer Component

**File:** `components/demo/DocumentViewer.tsx`

```typescript
"use client"

import { useState } from "react"
import type { BoundingBox } from "@/lib/types"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentViewerProps {
  imageUrl: string | null
  boundingBoxes: BoundingBox[]
}

export function DocumentViewer({ imageUrl, boundingBoxes }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-muted-foreground">No document loaded</p>
      </div>
    )
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <p className="text-sm font-medium">Document</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-auto p-4 bg-background">
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="Document"
            style={{ width: `${zoom}%` }}
            className="block"
          />

          {/* Bounding Box Overlay */}
          {boundingBoxes.map((box, index) => {
            const [x0, y0, x1, y1] = box.bbox
            const width = x1 - x0
            const height = y1 - y0

            const color = getBboxColor(box.type)
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className="absolute border-2 transition-all cursor-pointer"
                style={{
                  left: `${x0 * (zoom / 100)}px`,
                  top: `${y0 * (zoom / 100)}px`,
                  width: `${width * (zoom / 100)}px`,
                  height: `${height * (zoom / 100)}px`,
                  borderColor: color,
                  backgroundColor: isHovered
                    ? `${color}33`
                    : `${color}1A`,
                  borderWidth: isHovered ? '3px' : '2px',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Label Badge */}
                <span
                  className="absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded"
                  style={{
                    backgroundColor: color,
                    color: 'white',
                  }}
                >
                  {box.type}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Helper function to get bbox color by type
function getBboxColor(type: string): string {
  const colors: Record<string, string> = {
    title: 'hsl(217, 91%, 60%)',     // Blue
    text: 'hsl(220, 9%, 46%)',        // Gray
    table: 'hsl(142, 71%, 45%)',      // Green
    image: 'hsl(263, 70%, 62%)',      // Purple
    header: 'hsl(38, 92%, 50%)',      // Amber
  }
  return colors[type.toLowerCase()] || colors.text
}
```

**Phase 3 Testing:**
- [ ] Document image displays correctly
- [ ] Bounding boxes appear over document
- [ ] Boxes are color-coded by type
- [ ] Hover on bbox - opacity increases, border thickens
- [ ] Zoom in/out - bboxes scale with document
- [ ] Label badges show correct type

---

### 📊 Phase 4: Result Viewer (40 min)

**Goal:** Display OCR results with tabs (Markdown/HTML/JSON)

#### Step 4.1: Create ResultViewer Component

**File:** `components/demo/ResultViewer.tsx`

```typescript
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Download, Check } from "lucide-react"
import type { OcrResult } from "@/lib/types"
import { codeToHtml } from "shiki"

interface ResultViewerProps {
  result: OcrResult | null
  processing: boolean
}

export function ResultViewer({ result, processing }: ResultViewerProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("markdown")

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (processing) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Processing document...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-muted-foreground">Results will appear here</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Tab Headers */}
        <div className="border-b border-border px-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
        </div>

        {/* Markdown Tab */}
        <TabsContent value="markdown" className="flex-1 overflow-auto p-4 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Clean markdown output, ready for embeddings
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(result.markdown, "markdown")}
                >
                  {copied === "markdown" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(result.markdown, "document.md")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="text-sm bg-background p-4 rounded-lg border border-border overflow-x-auto whitespace-pre-wrap font-mono">
              {result.markdown}
            </pre>
          </div>
        </TabsContent>

        {/* HTML Tab */}
        <TabsContent value="html" className="flex-1 overflow-auto p-4 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Rendered HTML preview
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(result.html, "html")}
                >
                  {copied === "html" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(result.html, "document.html")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              className="prose prose-invert max-w-none bg-background p-4 rounded-lg border border-border"
              dangerouslySetInnerHTML={{ __html: result.html }}
            />
          </div>
        </TabsContent>

        {/* JSON Tab */}
        <TabsContent value="json" className="flex-1 overflow-auto p-4 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Full API response with metadata
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(JSON.stringify(result, null, 2), "json")}
                >
                  {copied === "json" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(JSON.stringify(result, null, 2), "result.json")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="text-sm bg-background p-4 rounded-lg border border-border overflow-x-auto font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

**Phase 4 Testing:**
- [ ] Result tabs appear after processing completes
- [ ] Markdown tab shows clean text
- [ ] HTML tab renders formatted content
- [ ] JSON tab shows full response
- [ ] Copy button works for each tab
- [ ] Download button saves correct file type
- [ ] Check icon appears briefly after copy

---

### 🔗 Phase 5: Integration & Polish (30 min)

**Goal:** Connect playground to landing page and add final touches

#### Step 5.1: Update Hero CTAs

**File:** `components/landing/Hero.tsx`

Find the "Try Demo" button and update it:

```typescript
// Before:
<Button size="lg" className="group">
  Try Demo
  <ArrowUpRight className="ml-2 h-4 w-4" />
</Button>

// After:
<Link href="/playground">
  <Button size="lg" className="group">
    Try Demo
    <ArrowUpRight className="ml-2 h-4 w-4" />
  </Button>
</Link>
```

Add import at the top:
```typescript
import Link from "next/link"
```

#### Step 5.2: Verify Example Documents API

**File:** `lib/api.ts`

Check if `getExampleDocuments()` exists. If not, add it:

```typescript
export async function getExampleDocuments(): Promise<ExampleDocument[]> {
  try {
    const response = await fetch(`${API_URL}/api/examples`)
    if (!response.ok) {
      throw new Error('Failed to fetch examples')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching examples:', error)
    // Return hardcoded fallback examples
    return [
      {
        id: "hindi-receipt",
        name: "Hindi Receipt",
        url: `${API_URL}/examples/hindi-receipt.jpg`,
        description: "Mixed Hindi/English receipt"
      },
      // ... more examples
    ]
  }
}
```

Add type definition in `lib/types.ts`:
```typescript
export interface ExampleDocument {
  id: string
  name: string
  url: string
  description: string
}
```

#### Step 5.3: Error Handling & Edge Cases

Add to `playground/page.tsx`:

```typescript
// Handle invalid file types
const validateFile = (file: File): string | null => {
  const validTypes = ['image/png', 'image/jpeg', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    return 'Please upload a PDF, PNG, or JPG file'
  }

  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    return 'File size must be less than 100MB'
  }

  return null
}

// In handleFileUpload:
const handleFileUpload = async (uploadedFile: File) => {
  const validationError = validateFile(uploadedFile)
  if (validationError) {
    setError(validationError)
    return
  }

  // ... rest of the function
}
```

**Phase 5 Testing:**
- [ ] Click "Try Demo" on landing page → navigates to /playground
- [ ] Upload oversized file → shows error
- [ ] Upload invalid file type → shows error
- [ ] Network error during processing → shows error with retry
- [ ] Click "Back to Home" → returns to landing page

---

## Testing Checklist

### Functional Testing

**Upload Flow:**
- [ ] Drag and drop file works
- [ ] Click to upload works
- [ ] URL input works (if implemented)
- [ ] File validation works (type, size)
- [ ] Error messages are clear

**Processing Flow:**
- [ ] Progress bar appears immediately
- [ ] Percentage updates smoothly
- [ ] ETA is displayed and updates
- [ ] Processing completes successfully

**Result Display:**
- [ ] Document displays correctly
- [ ] Bounding boxes appear
- [ ] Boxes are color-coded correctly
- [ ] Hover interactions work
- [ ] Zoom controls work

**Result Tabs:**
- [ ] Markdown tab shows clean text
- [ ] HTML tab renders correctly
- [ ] JSON tab shows full response
- [ ] Copy buttons work for all tabs
- [ ] Download buttons save correct files

**Example Documents:**
- [ ] Example buttons are visible
- [ ] Click example → loads document
- [ ] Example processes correctly

**Navigation:**
- [ ] Landing page CTAs go to playground
- [ ] "Back to Home" link works
- [ ] Browser back button works

### UI/UX Testing

**Desktop (1440px):**
- [ ] Split screen layout is 50/50
- [ ] Both panels are visible simultaneously
- [ ] Zoom controls are accessible
- [ ] Tab navigation is clear

**Tablet (768px):**
- [ ] Split screen still works
- [ ] Content is readable
- [ ] Buttons are accessible

**Mobile (375px):**
- [ ] Panels stack vertically
- [ ] Upload area is usable
- [ ] Example buttons wrap properly
- [ ] Tabs are accessible

**Performance:**
- [ ] Page loads quickly
- [ ] No layout shift
- [ ] Animations are smooth
- [ ] Large files don't freeze UI

### Browser Testing

- [ ] Chrome (primary browser)
- [ ] Safari (webkit-specific issues)
- [ ] Firefox (gecko engine)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## API Integration Points

### Existing Functions (from lib/api.ts)

```typescript
// Main OCR processing
processDocumentStream(
  file: File,
  onProgress: (progress: ProcessingProgress) => void,
  onComplete: (result: OcrResult) => void,
  onError: (error: Error) => void
): Promise<void>

// Get example documents
getExampleDocuments(): Promise<ExampleDocument[]>
```

### Expected Response Types (from lib/types.ts)

```typescript
interface OcrResult {
  markdown: string
  html: string
  json: any
  boundingBoxes: BoundingBox[]
  metadata: {
    pageCount: number
    processingTime: number
    language: string
  }
}

interface BoundingBox {
  bbox: [number, number, number, number] // [x0, y0, x1, y1]
  type: "title" | "text" | "table" | "image" | "header"
  content: string
  confidence: number
}

interface ProcessingProgress {
  percentage: number
  message: string
  eta: number // seconds
  currentPage: number
  totalPages: number
}
```

---

## Known Limitations & Future Enhancements

### Current Limitations

1. **Fixed 50/50 Split:** No draggable divider (can add react-resizable-panels later)
2. **No URL Input:** Only file upload (can add URL field to FileUploader)
3. **No Batch Processing:** One document at a time
4. **Limited Zoom:** Only 50%-200% (can add custom zoom levels)
5. **No Comparison View:** Can't compare multiple results

### Future Enhancements (Phase 6+)

1. **Resizable Panels:** Add react-resizable-panels for flexible layout
2. **URL Input:** Add text input for processing documents by URL
3. **Batch Mode:** Process multiple documents simultaneously
4. **History:** Save recent documents and results
5. **Comparison Mode:** Compare OCR results side-by-side
6. **Advanced Filters:** Filter bounding boxes by type
7. **Export Options:** More export formats (CSV for tables, etc)
8. **Keyboard Shortcuts:** Power user features
9. **Share Results:** Generate shareable links
10. **API Code Generator:** Show code to replicate in user's app

---

## Success Metrics

### Conversion Goals

- **Demo Completion Rate:** > 70% of users who upload complete the demo
- **Signup Trigger:** > 15% click "Get API Key" after seeing results
- **Time to First Result:** < 30 seconds from landing on playground
- **Error Rate:** < 5% of uploads fail

### User Engagement

- **Avg Time on Playground:** > 3 minutes
- **Example Documents Used:** > 40% try examples
- **Tab Interactions:** > 60% switch between tabs
- **Bbox Hover:** > 50% hover over at least one bbox

---

## Deployment Checklist

Before launching playground:

- [ ] All components tested locally
- [ ] API integration verified
- [ ] Example documents uploaded to server
- [ ] Error handling tested
- [ ] Mobile responsive tested
- [ ] Browser compatibility tested
- [ ] Analytics events added (optional)
- [ ] Landing page CTAs updated
- [ ] Documentation updated
- [ ] Staging deployment tested
- [ ] Production deployment ready

---

## Implementation Status

### Phase Completion Tracking

- [ ] **Phase 0:** Preparation (5 min)
- [ ] **Phase 1:** Basic Route & Upload (45 min)
- [ ] **Phase 2:** Layout & Progress (30 min)
- [ ] **Phase 3:** Document Viewer (45 min)
- [ ] **Phase 4:** Result Viewer (40 min)
- [ ] **Phase 5:** Integration & Polish (30 min)

**Total Estimated Time:** 2.5-3 hours

---

## Next Steps After Completion

Once playground is built and tested:

1. **Signup Flow:** Build signup modal (triggered from playground results)
2. **User Dashboard:** Show API key and usage stats after signup
3. **Analytics Setup:** Track playground usage and conversion metrics
4. **Launch Content:** Write blog posts and Reddit posts
5. **Community:** Set up Discord server and invite early users

---

**Document Status:** Ready for Implementation
**Last Updated:** 2025-01-05
**Version:** 1.0
