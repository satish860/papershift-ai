import Link from 'next/link';
import { FileText } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Wordmark */}
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          PaperShift
        </span>
        <span className="text-xl font-semibold text-muted-foreground">
          AI
        </span>
      </div>
    </Link>
  );
}
