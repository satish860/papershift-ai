"use client"

interface ExampleSelectorProps {
  onExampleSelect: (url: string) => void
}

const EXAMPLES = [
  {
    id: "hindi-receipt",
    label: "Hindi Receipt",
    url: "/examples/hindi-receipt.jpg",
    description: "Mixed Hindi/English receipt with stamps"
  },
  {
    id: "arabic-form",
    label: "Arabic Form",
    url: "/examples/arabic-form.pdf",
    description: "Arabic government form with signatures"
  },
  {
    id: "japanese-invoice",
    label: "Japanese Invoice",
    url: "/examples/japanese-invoice.pdf",
    description: "Japanese invoice with handwritten notes"
  },
  {
    id: "financial-pdf",
    label: "Financial PDF",
    url: "/examples/financial-report.pdf",
    description: "10-K report with complex tables"
  }
]

export function ExampleSelector({ onExampleSelect }: ExampleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Or try an example document:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAMPLES.map((example) => (
          <button
            key={example.id}
            onClick={() => onExampleSelect(example.url)}
            className="p-4 border border-border rounded-lg hover:border-primary hover:bg-card transition-all text-left group"
          >
            <div className="space-y-2">
              <p className="font-medium group-hover:text-primary transition-colors">
                {example.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {example.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
