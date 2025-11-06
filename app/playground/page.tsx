"use client"

import { useState } from "react"
import { FileUploader } from "@/components/demo/FileUploader"
import { ExampleSelector } from "@/components/demo/ExampleSelector"
import { ProcessingStatus } from "@/components/demo/ProcessingStatus"
import { DocumentViewer } from "@/components/demo/DocumentViewer"
import { ResultViewer } from "@/components/demo/ResultViewer"
import { PlaygroundLayout } from "@/components/demo/PlaygroundLayout"
import { processDocumentFromUrl } from "@/lib/api"
import { useEdgeStore } from "@/lib/edgestore"
import type { OcrResult } from "@/lib/types"

export default function PlaygroundPage() {
  const { edgestore } = useEdgeStore()

  // State management
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [eta, setEta] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [result, setResult] = useState<OcrResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null)

  // Handle file upload - Two stage process: EdgeStore -> OCR
  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile)
    setError(null)
    setProcessing(true)
    setProgress(0)
    setEta(null)
    setMessage("Uploading file...")
    setResult(null)

    try {
      // Stage 1: Upload to Edge Store (0-50% progress)
      setMessage("Uploading to Edge Store...")
      const uploadRes = await edgestore.publicFiles.upload({
        file: uploadedFile,
        input: { type: uploadedFile.type.includes('pdf') ? 'pdf' : 'image' },
        onProgressChange: (uploadProgress) => {
          // Map 0-100 to 0-50
          setProgress(Math.round(uploadProgress / 2))
          setMessage(`Uploading: ${uploadProgress}%`)
        },
      })

      const documentUrl = uploadRes.url
      setFileUrl(documentUrl)
      setMessage("Upload complete! Starting OCR processing...")

      // Stage 2: Process with OCR API (50-100% progress)
      await processDocumentFromUrl(
        documentUrl,
        // onProgress
        (ocrProgress, etaValue, progressMessage) => {
          // Map OCR progress 0-100 to 50-100 total progress
          const totalProgress = Math.round(50 + (ocrProgress / 2))
          setProgress(totalProgress)
          setEta(etaValue || null)
          setMessage(progressMessage || "Processing OCR...")
        },
        // onComplete
        (res) => {
          setResult(res)
          setProcessing(false)
          setProgress(100)
          setMessage("Complete!")
        },
        // onError
        (err) => {
          setError(err.message || "OCR processing failed")
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
    setError("Example documents coming soon!")
  }

  // Handle block selection
  const handleBlockClick = (index: number) => {
    setSelectedBlockIndex(index === selectedBlockIndex ? null : index)
  }

  // Handle retry
  const handleRetry = () => {
    setFile(null)
    setFileUrl(null)
    setResult(null)
    setError(null)
    setProgress(null)
    setEta(null)
    setMessage(null)
    setProcessing(false)
    setSelectedBlockIndex(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">PS</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">OCR Playground</h1>
                <p className="text-xs text-muted-foreground">Test your documents</p>
              </div>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                ✨ Powered by Advanced OCR
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Test OCR on Your Documents
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Upload a document or try an example to see our advanced OCR technology extract text, tables, and structure with precision
              </p>
            </div>

            <FileUploader onFileSelect={handleFileUpload} />
            <ExampleSelector onExampleSelect={handleExampleSelect} />
          </div>
        )}

        {(processing || result) && (
          <div className="space-y-4">
            {processing && <ProcessingStatus progress={progress} eta={eta} message={message} />}

            <PlaygroundLayout>
              <DocumentViewer
                imageUrl={fileUrl}
                boundingBoxes={result?.boundingBoxes || []}
                imageDimensions={result?.imageDimensions}
                selectedBlockIndex={selectedBlockIndex}
              />
              <ResultViewer
                result={result}
                processing={processing}
                selectedBlockIndex={selectedBlockIndex}
                onBlockClick={handleBlockClick}
              />
            </PlaygroundLayout>

            {result && (
              <div className="text-center">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg hover:bg-muted/50 border border-transparent hover:border-border"
                >
                  ← Upload another document
                </button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Processing Failed</h3>
              <p className="text-destructive font-medium mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-all hover:shadow-lg"
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
