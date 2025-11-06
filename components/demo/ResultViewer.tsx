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
        <div className="border-b border-border px-4 pt-4 bg-muted/30">
          <TabsList className="grid w-full grid-cols-3 h-11">
            <TabsTrigger value="blocks" className="data-[state=active]:bg-background">Blocks</TabsTrigger>
            <TabsTrigger value="markdown" className="data-[state=active]:bg-background">Markdown</TabsTrigger>
            <TabsTrigger value="html" className="data-[state=active]:bg-background">HTML</TabsTrigger>
          </TabsList>
        </div>

        {/* Blocks Tab */}
        <TabsContent value="blocks" className="flex-1 overflow-auto p-6 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Click on a block to highlight it in the document
              </p>
              <span className="text-xs text-muted-foreground">
                {result.boundingBoxes.length} blocks
              </span>
            </div>
            <div className="space-y-2">
              {result.boundingBoxes.map((block, index) => (
                <div
                  key={block.id || `block-${index}`}
                  onClick={() => onBlockClick?.(index)}
                  className={`group relative border-l-3 pl-4 py-3 rounded-r-lg cursor-pointer transition-all duration-200 ${
                    selectedBlockIndex === index
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border hover:border-primary/60 hover:bg-muted/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {block.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="text-sm leading-relaxed line-clamp-3">
                    {block.text || '(No text)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Markdown Tab */}
        <TabsContent value="markdown" className="flex-1 overflow-auto p-6 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Clean markdown output, ready for embeddings
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(result.markdown, "markdown")}
                  className="gap-2"
                >
                  {copied === "markdown" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(result.markdown, "document.md")}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="text-sm bg-muted/50 p-6 rounded-xl border border-border overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
              {result.markdown}
            </pre>
          </div>
        </TabsContent>

        {/* HTML Tab */}
        <TabsContent value="html" className="flex-1 overflow-auto p-6 m-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Rendered HTML preview
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(result.html, "html")}
                  className="gap-2"
                >
                  {copied === "html" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(result.html, "document.html")}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div
              className="prose prose-invert max-w-none bg-muted/50 p-6 rounded-xl border border-border"
              dangerouslySetInnerHTML={{ __html: result.html }}
            />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
