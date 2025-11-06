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
          relative w-full p-12 border-2 border-dashed rounded-xl
          transition-all duration-300 cursor-pointer
          ${isDragActive
            ? 'border-primary bg-primary/10 scale-[1.01] shadow-lg shadow-primary/20'
            : 'border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md'
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4 text-center">
          {isDragActive ? (
            <>
              <div className="relative">
                <File className="h-16 w-16 text-primary animate-bounce" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-semibold text-primary">Drop to upload</p>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full"></div>
                <Upload className="h-16 w-16 text-muted-foreground relative" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  Drop file or click to upload
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  PDF, PNG, JPG up to 100MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
