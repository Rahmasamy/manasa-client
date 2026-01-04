"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderBanner from "@/src/components/domain/HeaderBanner/HeaderBanner";
import ArticleContent from "@/src/components/domain/ArticleContent/ArticleContent";
import Sidebar from "@/src/components/domain/Sidebar/Sidebar";
import { articleApi, ApiArticle } from "@/src/infrastructure/api/articleApi";

export default function SingleArticle() {
  const params = useParams();
  const articleId = params?.id as string;

  const [article, setArticle] = useState<ApiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setError("معرف المقال غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await articleApi.getArticleById(articleId);

        // Handle different response structures:
        // 1. Article directly: {...}
        // 2. Wrapped in data: { data: {...} }
        // 3. Wrapped in article: { article: {...} }
        let articleData: ApiArticle;

        if (
          response &&
          typeof response === "object" &&
          "id" in response &&
          "title" in response
        ) {
          // It's an ApiArticle directly
          articleData = response as ApiArticle;
        } else if ("data" in response && response.data) {
          articleData = response.data as ApiArticle;
        } else if ("article" in response && response.article) {
          articleData = response.article as ApiArticle;
        } else {
          throw new Error("Invalid article response structure");
        }

        setArticle(articleData);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("فشل تحميل المقال. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Determine text direction based on ResearchType
  const researchType = article?.ResearchType?.toLowerCase();
  const isEnglish =
    researchType === "english" ||
    researchType === "eng" ||
    researchType === "إنجليزي";
  const textDirection: "rtl" | "ltr" = isEnglish ? "ltr" : "rtl";

  // Services for header banner - translated based on language
  const services = isEnglish
    ? [
        "Specialized Academic Articles",
        "Scientific Research and Studies",
        "Various Educational Topics",
      ]
    : [
        "مقالات أكاديمية متخصصة",
        "أبحاث ودراسات علمية",
        "مواضيع تعليمية متنوعة",
      ];

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir={textDirection}
      >
        <div className="text-lg text-gray-600">
          {isEnglish ? "Loading..." : "جاري التحميل..."}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir={textDirection}
      >
        <div className="text-lg text-red-600">
          {error || (isEnglish ? "Article not found" : "المقال غير موجود")}
        </div>
      </div>
    );
  }

  // Format date based on language
  const formattedDate = isEnglish
    ? new Date(article.createdAt).toLocaleDateString("en-US")
    : new Date(article.createdAt).toLocaleDateString("ar-SA");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <HeaderBanner
        title={article.title}
        services={services}
        viewCount={0}
        direction={textDirection}
      />

      {/* Main Content Area */}
      <div className="container mx-auto flex flex-col lg:flex-row bg-white">
        {/* Sidebar - Left */}
        {/* <Sidebar /> */}

        {/* Article Content - Right */}
        <div className="flex-1 min-w-0">
          <ArticleContent
            categoryTitle={article.subTitle || article.title}
            date={formattedDate}
            author={article.author || (isEnglish ? "Unknown" : "مجهول")}
            articleTitle={article.title}
            articleText={article.content || article.description || ""}
            direction={textDirection}
          />
          <a
            href="//www.dmca.com"
            title="DMCA.com Protection Status"
            class="dmca-badge"
          >
            {" "}
            <img
              src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=ba92f787-d15d-405e-8fac-f33d53c9e73f"
              alt="DMCA.com Protection Status"
            />
          </a>{" "}
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js">
            {" "}
          </script>
        </div>
      </div>
    </div>
  );
}
