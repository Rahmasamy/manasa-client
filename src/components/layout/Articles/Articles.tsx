"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import AcademicCard from "../../domain/AcademicCard/AcademicCard";
import ReactPaginate from "react-paginate";
import { CourseFilters } from "@/src/lib/consts/filters/Filters";
import { articleApi, ApiArticle } from "@/src/infrastructure/api/articleApi";
import { AcademicPayload } from "@/src/types/ElectronicLibrary/AcademicPayload";
import { useRouter } from "next/navigation";

export default function Articles() {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState<AcademicPayload[]>([]);
  const [articlesData, setArticlesData] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const itemsPerPage = 8; // 3 columns × 4 rows

  // Handle card button click
  const handleCardClick = (article: ApiArticle) => {
    console.log("Article clicked:", article);
    // Navigate to article detail page
    router.push(`/articles/${article.id}`);
  };

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleApi.getAllArticles();
        
        // Handle different response structures:
        // 1. Array directly: [{...}, {...}]
        // 2. Wrapped in data: { data: [{...}, {...}] }
        // 3. Wrapped in articles: { articles: [{...}, {...}] }
        let articlesData: ApiArticle[] = [];
        
        if (Array.isArray(response)) {
          articlesData = response;
        } else if (response.data && Array.isArray(response.data)) {
          articlesData = response.data;
        } else if (response.articles && Array.isArray(response.articles)) {
          articlesData = response.articles;
        }
        
        // Store original articles data
        setArticlesData(articlesData);
        
        // Map API articles to AcademicPayload format
        const mappedArticles: AcademicPayload[] = articlesData.map((article: ApiArticle) => {
          // Use content or description, truncate if too long for card display
          const fullText = article.content || article.description || "";
          const description = fullText.length > 150 
            ? fullText.substring(0, 150) + "..." 
            : fullText;
          
          return {
            image: article.imageUrl || article.photoUrl || "/imgs/article1.jpeg",
            title: article.title,
            description: description,
            price: "",
            buttonText: "اقرأ المزيد",
            writenBy: article.author || "مجهول",
            date: new Date(article.createdAt).toLocaleDateString("ar-SA"),
            onButtonClick: () => handleCardClick(article),
          };
        });
        
        setArticles(mappedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("فشل تحميل المقالات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Calculate pagination
  const pageCount = Math.ceil(articles.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = articles.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center px-4">
        <h2 className="text-center text-white font-bold text-2xl sm:text-3xl lg:text-5xl p-3 sm:p-5">
          المقالات
        </h2>
        <p className="text-center text-white font-bold text-base sm:text-lg lg:text-xl p-3 sm:p-5">
          {articles.length} مقالة
        </p>
      </div>
      <div className="w-full px-4 sm:px-8 lg:px-24 py-6 sm:py-10 mr-7">
        <div className="w-full flex flex-wrap justify-start gap-2 sm:gap-3 items-center">
          {/* {CourseFilters.map((filter, index) => (
            <Button
              key={filter + index}
              className="text-sm sm:text-base text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#4a4f52] hover:text-white py-2 sm:py-3 px-3 sm:px-4 transition-colors"
            >
              {filter}
            </Button>
          ))} */}
          <h1 className="font-bold text-2xl my-2">
            أحدث المقالات
          </h1>
        </div>
        <div className="min-h-screen bg-gradient-to-br p-4 sm:p-6 mt-4 sm:mt-6">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg text-gray-600">جاري التحميل...</div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg text-red-600">{error}</div>
              </div>
            )}

            {/* Cards Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {currentItems.length > 0 ? (
                    currentItems.map((card, index) => (
                      <AcademicCard
                        key={`article-${offset + index}`}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        price={card.price}
                        buttonText={card.buttonText}
                        onButtonClick={card.onButtonClick}
                        date={card.date}
                        writenBy={card.writenBy}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-600 py-8">
                      لا توجد مقالات متاحة
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                  <div className="flex justify-center">
                    <ReactPaginate
                      previousLabel="السابق"
                      nextLabel="التالي"
                      breakLabel="..."
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName="flex items-center gap-2"
                      pageClassName="inline-block"
                      pageLinkClassName="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      previousClassName="inline-block"
                      previousLinkClassName="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      nextClassName="inline-block"
                      nextLinkClassName="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      breakClassName="inline-block px-2"
                      breakLinkClassName="text-gray-500"
                      activeClassName="ring-2 ring-blue-500"
                      activeLinkClassName="!bg-blue-500 !text-white"
                      disabledClassName="opacity-50 cursor-not-allowed"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
