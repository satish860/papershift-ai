"use client"

import { Progress } from "@/components/ui/progress"

interface ProcessingStatusProps {
  progress: number | null
  eta?: number | null
  message?: string | null
}

export function ProcessingStatus({ progress, eta, message }: ProcessingStatusProps) {
  if (progress === null || progress === undefined) {
    return (
      <div className="w-full space-y-2 p-4 bg-card rounded-lg border border-border">
        <Progress value={0} className="h-2" />
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <span>Initializing...</span>
        </div>
      </div>
    )
  }

  const percentage = Math.round(progress)
  const etaDisplay = eta ? `${Math.ceil(eta)}s` : "calculating..."

  return (
    <div className="w-full space-y-2 p-4 bg-card rounded-lg border border-border">
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          {message || "Processing..."}
        </span>
        <span className="font-medium">
          {percentage}% • ETA: {etaDisplay}
        </span>
      </div>
    </div>
  )
}
