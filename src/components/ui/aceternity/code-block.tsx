"use client";
import { useEffect, useState } from "react";
import type { Highlighter } from "shiki";

// Lazily create the highlighter on first use so shiki (grammars + themes)
// is split into its own async chunk and only loads when a CodeBlock mounts.
let highlighterPromise: Promise<Highlighter> | null = null;
function getHighlighter() {
  highlighterPromise ??= import("shiki").then(({ createHighlighter }) =>
    createHighlighter({
      themes: ["one-dark-pro"],
      langs: ["javascript", "typescript", "jsx", "tsx"],
    }),
  );
  return highlighterPromise;
}

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

    getHighlighter().then((highlighter) => {
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
        <div className="relative flex h-full w-full items-center justify-center rounded-lg text-sm">
          <div className="animate-pulse text-muted-foreground">Loading…</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative h-full w-full rounded-lg font-mono text-sm">
        <div
          className="shiki-container"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};
