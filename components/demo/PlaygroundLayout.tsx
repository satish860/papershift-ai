"use client"

import { ReactNode } from "react"

interface PlaygroundLayoutProps {
  children: [ReactNode, ReactNode] // [DocumentViewer, ResultViewer]
}

export function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  const [leftPanel, rightPanel] = children

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[700px]">
      {/* Left Panel: Document Viewer */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {leftPanel}
      </div>

      {/* Right Panel: Result Viewer */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {rightPanel}
      </div>
    </div>
  )
}
