"use client";

import React, { useMemo, useState } from "react";
import { Calendar, User, ExternalLink, List, ChevronDown, ChevronUp } from "lucide-react";

interface ArticleContentProps {
  categoryTitle?: string;
  date?: string;
  author?: string;
  articleTitle: string;
  articleText: string;
  direction?: "rtl" | "ltr";
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Function to parse URLs and convert them to clickable links
function parseUrls(text: string): string {
  // Regex to match URLs (http, https, www)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  
  return text.replace(urlRegex, (url) => {
    // Ensure URL has protocol
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="text-[#2885AC] hover:underline">${url}</a>`;
  });
}

// Function to extract headings from markdown text
function extractHeadings(text: string): Heading[] {
  const headings: Heading[] = [];
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headerRegex.exec(text)) !== null) {
    const level = match[1].length;
    const headingText = match[2].trim();
    const id = headingText.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-أ-ي]/g, "");
    headings.push({ id, text: headingText, level });
  }

  return headings;
}

// Function to convert markdown headings to HTML with anchor IDs
function convertHeadingsToAnchors(text: string): string {
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  
  return text.replace(headerRegex, (match, hashes, headingText) => {
    const level = hashes.length;
    const text = headingText.trim();
    const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-أ-ي]/g, "");
    
    const fontSize = level === 1 ? '3xl' : level === 2 ? '2xl' : level === 3 ? 'xl' : 'lg';
    
    return `<h${level} id="${id}" class="font-bold text-${fontSize} mt-8 mb-4 text-gray-800 scroll-mt-24">${text}</h${level}>`;
  });
}

// Function to extract last section/link from content
function extractLastSection(text: string): { title: string; url: string } | null {
  // First, try to find markdown-style links: [title](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const markdownLinks: Array<{ title: string; url: string }> = [];
  let match;

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    markdownLinks.push({
      title: match[1],
      url: match[2],
    });
  }

  // If markdown links found, return the last one
  if (markdownLinks.length > 0) {
    return markdownLinks[markdownLinks.length - 1];
  }

  // Otherwise, try to find the last URL
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const urls: string[] = [];
  while ((match = urlRegex.exec(text)) !== null) {
    urls.push(match[0]);
  }

  if (urls.length > 0) {
    const lastUrl = urls[urls.length - 1];
    const fullUrl = lastUrl.startsWith("http") ? lastUrl : `https://${lastUrl}`;
    // Try to extract a title from context (text before the URL)
    const urlIndex = text.lastIndexOf(lastUrl);
    const beforeUrl = text.substring(Math.max(0, urlIndex - 100), urlIndex).trim();
    const titleMatch = beforeUrl.match(/(?:^|\n|\.|:)\s*([^\n\.:]{1,50})$/);
    const title = titleMatch ? titleMatch[1].trim() : "الانتقال إلى القسم الأخير";
    
    return {
      title: title.length > 50 ? "الانتقال إلى القسم الأخير" : title,
      url: fullUrl,
    };
  }

  // Try to find section headers (## Title or ### Title)
  const headerRegex = /(?:^|\n)(#{1,6})\s+(.+)$/gm;
  const headers: Array<{ title: string; url: string }> = [];
  while ((match = headerRegex.exec(text)) !== null) {
    const headerTitle = match[2].trim();
    const anchor = headerTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
    headers.push({
      title: headerTitle,
      url: `#${anchor}`,
    });
  }

  if (headers.length > 0) {
    return headers[headers.length - 1];
  }

  return null;
}

export default function ArticleContent({
  categoryTitle = "إدارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
  date = "11/11/2024",
  author = "طارق عفيفي",
  articleTitle,
  articleText,
  direction = "rtl",
}: ArticleContentProps) {
  const [tocOpen, setTocOpen] = useState(false);

  // Extract headings for TOC
  const headings = useMemo(() => {
    return extractHeadings(articleText);
  }, [articleText]);

  // Parse content with clickable URLs and anchored headings
  const parsedContent = useMemo(() => {
    let content = articleText;
    // First convert headings to anchors
    content = convertHeadingsToAnchors(content);
    // Then parse URLs
    content = parseUrls(content);
    return content;
  }, [articleText]);

  // Extract last section
  const lastSection = useMemo(() => {
    return extractLastSection(articleText);
  }, [articleText]);

  const handleLastSectionClick = () => {
    if (lastSection) {
      if (lastSection.url.startsWith("#")) {
        // Internal anchor link
        const element = document.getElementById(lastSection.url.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // External URL
        window.open(lastSection.url, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleTocClick = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close TOC on mobile after clicking
      if (window.innerWidth < 1024) {
        setTocOpen(false);
      }
    }
  };

  return (
    <article className="w-full px-6 lg:px-24 py-10" dir={direction}>
      {/* Category Title */}
      {/* <h2 className="font-bold text-2xl mb-6 text-gray-800">
        {categoryTitle}
      </h2> */}

      {/* Metadata */}
      <div className={`flex flex-wrap items-center gap-6 mb-6 text-gray-600 ${
        direction === "ltr" ? "justify-start" : "justify-end"
      }`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{date}</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{author}</span>
        </div> */}
      </div>

      {/* Article Title */}
      <h1 className="font-bold text-3xl lg:text-4xl mb-6 text-[#2885AC]">
        {articleTitle}
      </h1>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#2885AC] text-white hover:bg-teal-600 transition-colors"
          >
            <div className="flex items-center gap-2">
              <List className="w-5 h-5" />
              <span className="font-semibold">
                {direction === "ltr" ? "Table of Contents" : "جدول المحتويات"}
              </span>
            </div>
            {tocOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {tocOpen && (
            <nav className="px-4 py-3">
              <ul className={`space-y-2 ${direction === "ltr" ? "text-left" : "text-right"}`}>
                {headings.map((heading, index) => (
                  <li
                    key={`${heading.id}-${index}`}
                    style={{ 
                      paddingRight: direction === "rtl" ? `${(heading.level - 1) * 1}rem` : undefined,
                      paddingLeft: direction === "ltr" ? `${(heading.level - 1) * 1}rem` : undefined,
                    }}
                  >
                    <button
                      onClick={() => handleTocClick(heading.id)}
                      className="text-[#2885AC] hover:underline hover:text-teal-600 transition-colors text-sm text-left w-full"
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* Article Text */}
      <div className="prose prose-lg max-w-none">
        <div 
          className={`text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line ${
            direction === "ltr" ? "text-left" : "text-justify"
          }`}
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      </div>

      {/* Last Section Navigation Button */}
      {lastSection && (
        <div className={`mt-8 pt-6 border-t border-gray-200 ${direction === "ltr" ? "text-left" : "text-right"}`}>
          <button
            onClick={handleLastSectionClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
          >
            <span>{lastSection.title}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  );
}
