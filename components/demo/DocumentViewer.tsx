"use client"

import { useState } from "react"
import type { BoundingBox } from "@/lib/types"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentViewerProps {
  imageUrl: string | null
  boundingBoxes?: BoundingBox[]
}

export function DocumentViewer({ imageUrl, boundingBoxes = [] }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)

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
          {/* Bounding boxes will be added in Phase 3 */}
        </div>
      </div>
    </div>
  )
}
