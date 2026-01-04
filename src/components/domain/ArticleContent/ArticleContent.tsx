import React from "react";
import { Calendar, User } from "lucide-react";

interface ArticleContentProps {
  categoryTitle?: string;
  date?: string;
  author?: string;
  articleTitle: string;
  articleText: string;
  direction?: "rtl" | "ltr";
}

export default function ArticleContent({
  categoryTitle = "إدارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
  date = "11/11/2024",
  author = "طارق عفيفي",
  articleTitle,
  articleText,
  direction = "rtl",
}: ArticleContentProps) {
  return (
    <article className="w-full px-6 lg:px-24 py-10" dir={direction}>
      {/* Category Title */}
      <h2 className="font-bold text-2xl mb-6 text-gray-800">
        {categoryTitle}
      </h2>

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
        <p className={`text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line ${
          direction === "ltr" ? "text-left" : "text-justify"
        }`}>
          {articleText}
        </p>
      </div>
    </article>
  );
}

