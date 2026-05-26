"use client";
import { createHighlighter } from "shiki";
import { useEffect, useState } from "react";

// Pre-create highlighter with only needed languages
const highlighterPromise = createHighlighter({
  themes: ["one-dark-pro"],
  langs: ["javascript", "typescript", "jsx", "tsx"],
});

type CodeBlockProps = {
  language: string;
  highlightLines?: number[];
  className?: string;
  code?: string;
  tabs?: never;
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({ language, code, className }: CodeBlockProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const activeCode = code;
  const activeLanguage = language;

  useEffect(() => {
    let mounted = true;

    highlighterPromise.then((highlighter) => {
      if (mounted) {
        const html = highlighter.codeToHtml(String(activeCode), {
          lang: activeLanguage,
          theme: "one-dark-pro",
        });
        setHighlightedCode(html);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeCode, activeLanguage]);

  if (!highlightedCode) {
    return (
      <div className={className}>
        <div className="relative flex h-full w-full items-center justify-center rounded-lg p-4 text-sm">
          <div className="animate-pulse text-muted-foreground">Loading…</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative h-full w-full rounded-lg p-4 text-sm font-mono">
        <style>{`
          .shiki-container {
            background: transparent !important;
            margin: 0;
            padding: 0;
            font-size: 8px;
            overflow-x: auto;
          }
          .shiki code {
            display: block;
            width: 100%;
          }
          .line {
            display: block;
            width: 100%;
          }
        `}</style>
        <div
          className="shiki-container"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};
