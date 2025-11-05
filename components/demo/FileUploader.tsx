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
