"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Download, Check } from "lucide-react"
import type { OcrResult } from "@/lib/types"

interface ResultViewerProps {
  result: OcrResult | null
  processing: boolean
  selectedBlockIndex?: number | null
  onBlockClick?: (index: number) => void
}

export function ResultViewer({ result, processing, selectedBlockIndex, onBlockClick }: ResultViewerProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("blocks")

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
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </div>

        {/* Blocks Tab */}
        <TabsContent value="blocks" className="flex-1 overflow-auto p-4 m-0">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click on a block to highlight it in the document
            </p>
            <div className="space-y-2">
              {result.boundingBoxes.map((block, index) => (
                <div
                  key={block.id || `block-${index}`}
                  onClick={() => onBlockClick?.(index)}
                  className={`border-l-2 pl-4 py-2 cursor-pointer transition-all ${
                    selectedBlockIndex === index
                      ? 'border-primary bg-primary/10'
                      : 'border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {block.type} • Block {index + 1}
                  </div>
                  <div className="text-sm line-clamp-3">
                    {block.text || '(No text)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

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

      </Tabs>
    </div>
  )
}
