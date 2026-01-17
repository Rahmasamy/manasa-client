"use client";

import React, { useMemo } from "react";
import { Calendar, User, ExternalLink } from "lucide-react";

interface ArticleContentProps {
  categoryTitle?: string;
  date?: string;
  author?: string;
  articleTitle: string;
  articleText: string;
  direction?: "rtl" | "ltr";
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
  // Parse content with clickable URLs
  const parsedContent = useMemo(() => {
    return parseUrls(articleText);
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
