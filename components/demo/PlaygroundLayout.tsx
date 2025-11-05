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
