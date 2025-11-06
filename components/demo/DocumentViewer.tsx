"use client"

import { useState, useRef } from "react"
import type { BoundingBox } from "@/lib/types"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentViewerProps {
  imageUrl: string | null
  boundingBoxes?: BoundingBox[]
  imageDimensions?: {
    width: number
    height: number
  }
  selectedBlockIndex?: number | null
}

export function DocumentViewer({ imageUrl, boundingBoxes = [], imageDimensions, selectedBlockIndex }: DocumentViewerProps) {
  const [scale, setScale] = useState(1.0)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.0))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5))

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
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 2.0}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="flex flex-col items-center py-4">
          <div
            className="inline-block relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-in-out"
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Document"
              className="block max-w-full object-contain"
            />

            {/* Bounding Box Overlay - SVG approach for accurate scaling */}
            {imageDimensions && boundingBoxes && boundingBoxes.length > 0 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                preserveAspectRatio="none"
              >
                {boundingBoxes.map((box, index) => {
                  const { coordinates, type } = box;
                  const isSelected = selectedBlockIndex === index;

                  // Use blue highlight for selected, type-based color for unselected
                  const baseColor = getBboxColor(type);
                  const selectedColor = "rgb(59, 130, 246)"; // Tailwind blue-500

                  return (
                    <g key={box.id || `bbox-${index}`}>
                      <rect
                        x={coordinates.x}
                        y={coordinates.y}
                        width={coordinates.width}
                        height={coordinates.height}
                        fill={isSelected ? "rgba(59, 130, 246, 0.2)" : "none"}
                        stroke={isSelected ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.6)"}
                        strokeWidth={isSelected ? "3" : "2"}
                        className={isSelected ? "" : "hover:fill-blue-500/10"}
                      >
                        <title>{box.text || type}</title>
                      </rect>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
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
