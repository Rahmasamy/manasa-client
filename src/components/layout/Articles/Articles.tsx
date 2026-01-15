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
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Calculate items per page based on screen size
  useEffect(() => {
    const calculateItemsPerPage = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 1024) {
        // Large screens: 3 columns, 4 rows = 12 items
        setItemsPerPage(12);
      } else if (width >= 768) {
        // Medium screens: 2 columns, 3 rows = 6 items
        setItemsPerPage(6);
      } else {
        // Small screens: 1 column, 6 rows = 6 items
        setItemsPerPage(6);
      }
    };

    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

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
        const mappedArticles: AcademicPayload[] = articlesData.map(
          (article: ApiArticle) => {
            // Use content or description, truncate if too long for card display
            const fullText = article.content || article.description || "";
            const description =
              fullText.length > 150
                ? fullText.substring(0, 150) + "..."
                : fullText;

            return {
              image:
                article.imageUrl || article.photoUrl || "/imgs/article1.jpeg",
              title: article.title,
              description: description,
              price: "",
              buttonText: "اقرأ المزيد",
              writenBy: article.author || "مجهول",
              date: new Date(article.createdAt).toLocaleDateString("ar-SA"),
              onButtonClick: () => handleCardClick(article),
            };
          }
        );

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
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[250px] xs:min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <h2 className="text-center text-white font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
          المقالات
        </h2>
        <p className="text-center text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl px-3 py-1 sm:px-4 sm:py-2">
          {articles.length} مقالة
        </p>
      </div>
      <div className="w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full flex flex-wrap justify-start gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 items-center mb-4 sm:mb-6">
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
          {/* {CourseFilters.map((filter, index) => (
            <Button
              key={filter + index}
              className="text-sm sm:text-base text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#4a4f52] hover:text-white py-2 sm:py-3 px-3 sm:px-4 transition-colors"
            >
              {filter}
            </Button>
          ))} */}
          <h1 className="font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl my-2">أحدث المقالات</h1>
        </div>
        <div className="min-h-screen bg-gradient-to-br p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[450px]">
                <div className="text-base xs:text-lg sm:text-xl text-gray-600">جاري التحميل...</div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex justify-center items-center min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[450px] px-4">
                <div className="text-base xs:text-lg sm:text-xl text-red-600 text-center">{error}</div>
              </div>
            )}

            {/* Cards Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-6 md:mb-8">
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
                    <div className="col-span-full text-center text-gray-600 py-6 xs:py-8 sm:py-10 text-sm xs:text-base sm:text-lg">
                      لا توجد مقالات متاحة
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                  <div className="flex justify-center mt-4 sm:mt-6">
                    <ReactPaginate
                      previousLabel="السابق"
                      nextLabel="التالي"
                      breakLabel="..."
                      pageCount={pageCount}
                      marginPagesDisplayed={isMobile ? 1 : 2}
                      pageRangeDisplayed={isMobile ? 2 : 3}
                      onPageChange={handlePageClick}
                      containerClassName="flex flex-wrap items-center justify-center gap-1 xs:gap-1.5 sm:gap-2"
                      pageClassName="inline-block"
                      pageLinkClassName="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs xs:text-sm sm:text-base rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      previousClassName="inline-block"
                      previousLinkClassName="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs xs:text-sm sm:text-base rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      nextClassName="inline-block"
                      nextLinkClassName="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs xs:text-sm sm:text-base rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors border border-gray-300"
                      breakClassName="inline-block px-1 xs:px-2"
                      breakLinkClassName="text-gray-500 text-xs xs:text-sm"
                      activeClassName="ring-2 ring-blue-500"
                      activeLinkClassName="!bg-blue-500 !text-white"
                      disabledClassName="opacity-50 cursor-not-allowed"
                    />
                  </div>
                )}
              </>
            )}
          </div>
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
