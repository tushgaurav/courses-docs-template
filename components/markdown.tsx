"use client";

import { useEffect, useState } from "react";

interface MarkdownProps {
  content: string;
}

// Simple markdown parser for common elements
function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Code blocks with language
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="code-block" data-language="$1"><code>$2</code></pre>'
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="heading-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="heading-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="heading-1">$1</h1>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="link" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="quote">$1</blockquote>');

  // Tables
  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_, header: string, body: string) => {
      const headers = header
        .split("|")
        .filter((h: string) => h.trim())
        .map((h: string) => `<th>${h.trim()}</th>`)
        .join("");
      const rows = body
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<table class="table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="list-item">$1</li>');
  html = html.replace(
    /(<li class="list-item">.*<\/li>\n?)+/g,
    '<ul class="unordered-list">$&</ul>'
  );

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ordered-item">$1</li>');
  html = html.replace(
    /(<li class="ordered-item">.*<\/li>\n?)+/g,
    '<ol class="ordered-list">$&</ol>'
  );

  // Paragraphs (wrap standalone lines)
  html = html
    .split("\n\n")
    .map((block) => {
      if (
        block.startsWith("<") ||
        block.trim() === "" ||
        block.startsWith("```")
      ) {
        return block;
      }
      return `<p class="paragraph">${block}</p>`;
    })
    .join("\n\n");

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="divider" />');

  return html;
}

export function Markdown({ content }: MarkdownProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(parseMarkdown(content));
  }, [content]);

  return (
    <div
      className="markdown-content"
      // biome-ignore lint: using dangerouslySetInnerHTML for markdown rendering
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
