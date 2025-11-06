"use client"

import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface ProcessingStatusProps {
  progress: number | null
  eta?: number | null
  message?: string | null
}

export function ProcessingStatus({ progress, eta, message }: ProcessingStatusProps) {
  if (progress === null || progress === undefined) {
    return (
      <div className="w-full space-y-3 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl border border-primary/20 shadow-lg">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Initializing...</span>
        </div>
        <Progress value={0} className="h-2" />
      </div>
    )
  }

  const percentage = Math.round(progress)
  const etaDisplay = eta ? `${Math.ceil(eta)}s remaining` : "calculating..."

  return (
    <div className="w-full space-y-3 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl border border-primary/20 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-medium">
            {message || "Processing..."}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{percentage}%</div>
          <div className="text-xs text-muted-foreground">{etaDisplay}</div>
        </div>
      </div>
      <Progress value={percentage} className="h-2.5" />
    </div>
  )
}
