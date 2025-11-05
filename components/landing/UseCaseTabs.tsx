'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabContent {
  id: string;
  label: string;
  title: string;
  description: string;
  flowSteps: string[];
  codeText: string; // Plain text for copying
  codeDisplay: React.ReactNode; // Syntax-highlighted JSX for display
  language: string;
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          {/* Step Box */}
          <div className="bg-card border border-border rounded-lg px-4 py-3 min-w-[120px] text-center">
            <span className="text-sm font-medium">{step}</span>
          </div>
          {/* Arrow */}
          {index < steps.length - 1 && (
            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({
  codeText,
  codeDisplay,
  language
}: {
  codeText: string;
  codeDisplay: React.ReactNode;
  language: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors z-10"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Code Block */}
      <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground ml-2">{language}</span>
        </div>
        <pre className="font-mono text-sm">
          <code>{codeDisplay}</code>
        </pre>
      </div>
    </div>
  );
}

export function UseCaseTabs() {
  const [activeTab, setActiveTab] = useState('rag');

  const tabs: TabContent[] = [
    {
      id: 'rag',
      label: 'RAG Pipeline',
      title: 'Build Better RAG Systems',
      description:
        'Clean OCR improves embedding quality and retrieval accuracy in your RAG pipeline.',
      flowSteps: ['Document', 'OCR', 'Clean Text', 'Embeddings', 'Vector DB'],
      codeText: `from papershift import OCR
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings

# Process document with clean OCR
result = OCR.process("financial_report.pdf")

# Create embeddings from clean text
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_texts(
    texts=[result.markdown],
    embedding=embeddings
)

# Now your RAG retrieval will be accurate
query = "What was Q4 revenue?"
docs = vectorstore.similarity_search(query)`,
      codeDisplay: (
        <>
          <span className="text-purple-400">from</span> <span className="text-blue-400">papershift</span> <span className="text-purple-400">import</span> <span className="text-green-400">OCR</span>{'\n'}
          <span className="text-purple-400">from</span> <span className="text-blue-400">langchain.vectorstores</span> <span className="text-purple-400">import</span> <span className="text-green-400">Pinecone</span>{'\n'}
          <span className="text-purple-400">from</span> <span className="text-blue-400">langchain.embeddings</span> <span className="text-purple-400">import</span> <span className="text-green-400">OpenAIEmbeddings</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Process document with clean OCR</span>{'\n'}
          <span className="text-foreground">result</span> <span className="text-purple-400">=</span> <span className="text-green-400">OCR</span><span className="text-foreground">.</span><span className="text-yellow-400">process</span><span className="text-foreground">(</span><span className="text-orange-400">"financial_report.pdf"</span><span className="text-foreground">)</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Create embeddings from clean text</span>{'\n'}
          <span className="text-foreground">embeddings</span> <span className="text-purple-400">=</span> <span className="text-green-400">OpenAIEmbeddings</span><span className="text-foreground">()</span>{'\n'}
          <span className="text-foreground">vectorstore</span> <span className="text-purple-400">=</span> <span className="text-green-400">Pinecone</span><span className="text-foreground">.</span><span className="text-yellow-400">from_texts</span><span className="text-foreground">(</span>{'\n'}
          <span className="text-foreground">    texts</span><span className="text-purple-400">=</span><span className="text-foreground">[result.markdown],</span>{'\n'}
          <span className="text-foreground">    embedding</span><span className="text-purple-400">=</span><span className="text-foreground">embeddings</span>{'\n'}
          <span className="text-foreground">)</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Now your RAG retrieval will be accurate</span>{'\n'}
          <span className="text-foreground">query</span> <span className="text-purple-400">=</span> <span className="text-orange-400">"What was Q4 revenue?"</span>{'\n'}
          <span className="text-foreground">docs</span> <span className="text-purple-400">=</span> <span className="text-foreground">vectorstore.</span><span className="text-yellow-400">similarity_search</span><span className="text-foreground">(query)</span>
        </>
      ),
      language: 'Python',
    },
    {
      id: 'agent',
      label: 'AI Agent',
      title: 'Reliable AI Agents',
      description:
        'Clean OCR text feeds perfectly into structured extraction with Instructor and GPT-4.',
      flowSteps: ['Upload', 'Extract Data', 'Validate', 'Take Action'],
      codeText: `from papershift import OCR
from instructor import from_openai
from openai import OpenAI
from pydantic import BaseModel

# Get clean OCR text
result = OCR.process("invoice.pdf")

# Use Instructor for structured extraction
class Invoice(BaseModel):
    total: float
    due_date: str
    vendor: str

client = from_openai(OpenAI())
invoice = client.chat.completions.create(
    model="gpt-4",
    response_model=Invoice,
    messages=[{
        "role": "user",
        "content": f"Extract invoice data: {result.markdown}"
    }]
)

# Accurate OCR = Correct actions
if invoice.total > 10000:
    send_for_approval(invoice)`,
      codeDisplay: (
        <>
          <span className="text-purple-400">from</span> <span className="text-blue-400">papershift</span> <span className="text-purple-400">import</span> <span className="text-green-400">OCR</span>{'\n'}
          <span className="text-purple-400">from</span> <span className="text-blue-400">instructor</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">from_openai</span>{'\n'}
          <span className="text-purple-400">from</span> <span className="text-blue-400">openai</span> <span className="text-purple-400">import</span> <span className="text-green-400">OpenAI</span>{'\n'}
          <span className="text-purple-400">from</span> <span className="text-blue-400">pydantic</span> <span className="text-purple-400">import</span> <span className="text-green-400">BaseModel</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Get clean OCR text</span>{'\n'}
          <span className="text-foreground">result</span> <span className="text-purple-400">=</span> <span className="text-green-400">OCR</span><span className="text-foreground">.</span><span className="text-yellow-400">process</span><span className="text-foreground">(</span><span className="text-orange-400">"invoice.pdf"</span><span className="text-foreground">)</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Use Instructor for structured extraction</span>{'\n'}
          <span className="text-purple-400">class</span> <span className="text-green-400">Invoice</span><span className="text-foreground">(</span><span className="text-green-400">BaseModel</span><span className="text-foreground">):</span>{'\n'}
          <span className="text-foreground">    total: </span><span className="text-cyan-400">float</span>{'\n'}
          <span className="text-foreground">    due_date: </span><span className="text-cyan-400">str</span>{'\n'}
          <span className="text-foreground">    vendor: </span><span className="text-cyan-400">str</span>{'\n'}
          {'\n'}
          <span className="text-foreground">client</span> <span className="text-purple-400">=</span> <span className="text-yellow-400">from_openai</span><span className="text-foreground">(</span><span className="text-green-400">OpenAI</span><span className="text-foreground">())</span>{'\n'}
          <span className="text-foreground">invoice</span> <span className="text-purple-400">=</span> <span className="text-foreground">client.chat.completions.</span><span className="text-yellow-400">create</span><span className="text-foreground">(</span>{'\n'}
          <span className="text-foreground">    model</span><span className="text-purple-400">=</span><span className="text-orange-400">"gpt-4"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">    response_model</span><span className="text-purple-400">=</span><span className="text-green-400">Invoice</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">    messages</span><span className="text-purple-400">=</span><span className="text-foreground">{'[{'}</span>{'\n'}
          <span className="text-foreground">        </span><span className="text-orange-400">"role"</span><span className="text-foreground">: </span><span className="text-orange-400">"user"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">        </span><span className="text-orange-400">"content"</span><span className="text-foreground">: </span><span className="text-cyan-400">f</span><span className="text-orange-400">"Extract invoice data: </span><span className="text-foreground">{'{'}</span><span className="text-foreground">result.markdown</span><span className="text-foreground">{'}'}</span><span className="text-orange-400">"</span>{'\n'}
          <span className="text-foreground">    {'}]'}</span>{'\n'}
          <span className="text-foreground">)</span>{'\n'}
          {'\n'}
          <span className="text-gray-500"># Accurate OCR = Correct actions</span>{'\n'}
          <span className="text-purple-400">if</span> <span className="text-foreground">invoice.total</span> <span className="text-purple-400">&gt;</span> <span className="text-blue-300">10000</span><span className="text-foreground">:</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-yellow-400">send_for_approval</span><span className="text-foreground">(invoice)</span>
        </>
      ),
      language: 'Python',
    },
    {
      id: 'nocode',
      label: 'No-Code',
      title: 'No-Code Integrations',
      description:
        'Connect PaperShift to Make.com, Zapier, or any tool via webhook for instant automation.',
      flowSteps: ['Trigger', 'API Call', 'Parse Result', 'Action'],
      codeText: `{
  "url": "https://api.papershift.ai/v1/process",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY"
  },
  "body": {
    "file_url": "{{trigger.document_url}}",
    "output_format": "markdown"
  },
  "response": {
    "markdown": "{{response.markdown}}",
    "metadata": "{{response.metadata}}"
  }
}

// Use in Make.com, Zapier, n8n, or any automation tool`,
      codeDisplay: (
        <>
          <span className="text-foreground">{'{'}</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-cyan-400">"url"</span><span className="text-foreground">: </span><span className="text-orange-400">"https://api.papershift.ai/v1/process"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-cyan-400">"method"</span><span className="text-foreground">: </span><span className="text-orange-400">"POST"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-cyan-400">"headers"</span><span className="text-foreground">: </span><span className="text-foreground">{'{'}</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-cyan-400">"Authorization"</span><span className="text-foreground">: </span><span className="text-orange-400">"Bearer YOUR_API_KEY"</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-foreground">{'}'}</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-cyan-400">"body"</span><span className="text-foreground">: </span><span className="text-foreground">{'{'}</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-cyan-400">"file_url"</span><span className="text-foreground">: </span><span className="text-orange-400">"</span><span className="text-orange-400">{'{{'}trigger.document_url{'}}'}</span><span className="text-orange-400">"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-cyan-400">"output_format"</span><span className="text-foreground">: </span><span className="text-orange-400">"markdown"</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-foreground">{'}'}</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-cyan-400">"response"</span><span className="text-foreground">: </span><span className="text-foreground">{'{'}</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-cyan-400">"markdown"</span><span className="text-foreground">: </span><span className="text-orange-400">"</span><span className="text-orange-400">{'{{'}response.markdown{'}}'}</span><span className="text-orange-400">"</span><span className="text-foreground">,</span>{'\n'}
          <span className="text-foreground">    </span><span className="text-cyan-400">"metadata"</span><span className="text-foreground">: </span><span className="text-orange-400">"</span><span className="text-orange-400">{'{{'}response.metadata{'}}'}</span><span className="text-orange-400">"</span>{'\n'}
          <span className="text-foreground">  </span><span className="text-foreground">{'}'}</span>{'\n'}
          <span className="text-foreground">{'}'}</span>{'\n'}
          {'\n'}
          <span className="text-gray-500">// Use in Make.com, Zapier, n8n, or any automation tool</span>
        </>
      ),
      language: 'JSON',
    },
  ];

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're building RAG systems, AI agents, or no-code workflows,
            PaperShift integrates seamlessly.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-card border border-border rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title & Description */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">
                {activeTabContent.title}
              </h3>
              <p className="text-muted-foreground">
                {activeTabContent.description}
              </p>
            </div>

            {/* Flow Diagram */}
            <FlowDiagram steps={activeTabContent.flowSteps} />

            {/* Code Example */}
            <CodeBlock
              codeText={activeTabContent.codeText}
              codeDisplay={activeTabContent.codeDisplay}
              language={activeTabContent.language}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="shadow-glow">
            <a href="#demo">Try Free - No Credit Card</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
