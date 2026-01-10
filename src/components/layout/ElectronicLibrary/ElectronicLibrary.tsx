"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useCallback } from "react";
import AcademicCard from "../../domain/AcademicCard/AcademicCard";
import ReactPaginate from "react-paginate";
import {
  electronicLibraryApi,
  ApiElectronicLibrary,
} from "@/src/infrastructure/api/electronicLibraryApi";
import { AcademicPayload } from "@/src/types/ElectronicLibrary/AcademicPayload";
import { useRouter } from "next/navigation";

type ResearchTypeFilter = "arabic" | "english" | null;

export default function ElectronicLibrary() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allLibraryItems, setAllLibraryItems] = useState<AcademicPayload[]>([]);
  const [filteredLibraryItems, setFilteredLibraryItems] = useState<
    AcademicPayload[]
  >([]);
  const [allLibraryItemsData, setAllLibraryItemsData] = useState<
    ApiElectronicLibrary[]
  >([]);
  const [selectedFilter, setSelectedFilter] =
    useState<ResearchTypeFilter>(null);
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
  const handleCardClick = useCallback(
    (item: ApiElectronicLibrary) => {
      console.log("Library item clicked:", item);
      // Navigate to library item detail page
      router.push(`/electronic-library/${item.id}`);
    },
    [router]
  );

  // Fetch library items from API
  useEffect(() => {
    const fetchLibraryItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await electronicLibraryApi.getAllLibraryItems();

        // Handle different response structures:
        // 1. Array directly: [{...}, {...}]
        // 2. Wrapped in data: { data: [{...}, {...}] }
        // 3. Wrapped in library: { library: [{...}, {...}] }
        let itemsData: ApiElectronicLibrary[] = [];

        if (Array.isArray(response)) {
          itemsData = response;
        } else if (response.data && Array.isArray(response.data)) {
          itemsData = response.data;
        } else if (response.library && Array.isArray(response.library)) {
          itemsData = response.library;
        }

        // Store original library items data
        setAllLibraryItemsData(itemsData);

        // Map API library items to AcademicPayload format
        const mappedItems: AcademicPayload[] = itemsData.map(
          (item: ApiElectronicLibrary) => {
            // Use content or description, truncate if too long for card display
            const fullText = item.content || item.description || "";
            const description =
              fullText.length > 150
                ? fullText.substring(0, 150) + "..."
                : fullText;

            return {
              image: item.imageUrl || item.photoUrl || "/imgs/article1.jpeg",
              title: item.title,
              description: description,
              price: "",
              buttonText: "اقرأ المزيد",
              writenBy: item.author || "مجهول",
              date: new Date(item.createdAt).toLocaleDateString("ar-SA"),
              onButtonClick: () => handleCardClick(item),
            };
          }
        );

        setAllLibraryItems(mappedItems);
        setFilteredLibraryItems(mappedItems);
      } catch (err) {
        console.error("Error fetching library items:", err);
        setError("فشل تحميل المكتبة الإلكترونية. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryItems();
  }, []);

  // Filter library items based on ResearchType
  useEffect(() => {
    if (selectedFilter === null) {
      // Show all items
      setFilteredLibraryItems(allLibraryItems);
    } else {
      // Filter by ResearchType
      const filtered = allLibraryItemsData
        .filter((item) => {
          const researchType = item.ResearchType?.toLowerCase();
          if (selectedFilter === "arabic") {
            return researchType === "arabic" || researchType === "عربي";
          } else if (selectedFilter === "english") {
            return (
              researchType === "english" ||
              researchType === "eng" ||
              researchType === "إنجليزي"
            );
          }
          return true;
        })
        .map((item: ApiElectronicLibrary) => {
          const fullText = item.content || item.description || "";
          const description =
            fullText.length > 150
              ? fullText.substring(0, 150) + "..."
              : fullText;

          return {
            image: item.imageUrl || item.photoUrl || "/imgs/article1.jpeg",
            title: item.title,
            description: description,
            price: "",
            buttonText: "اقرأ المزيد",
            writenBy: item.author || "مجهول",
            date: new Date(item.createdAt).toLocaleDateString("ar-SA"),
            onButtonClick: () => handleCardClick(item),
          };
        });

      setFilteredLibraryItems(filtered);
    }
    // Reset to first page when filter changes
    setCurrentPage(0);
  }, [selectedFilter, allLibraryItems, allLibraryItemsData, handleCardClick]);

  // Handle filter button click
  const handleFilterClick = (filterType: ResearchTypeFilter) => {
    setSelectedFilter(filterType);
  };

  // Calculate pagination
  const pageCount = Math.ceil(filteredLibraryItems.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredLibraryItems.slice(
    offset,
    offset + itemsPerPage
  );

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
          المكتبة الألكترونية
        </h2>
        <p className="text-center text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl px-3 py-1 sm:px-4 sm:py-2">
          {filteredLibraryItems.length} عنصر
        </p>
      </div>
      <div className="w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full flex flex-wrap justify-start gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 items-center mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={() => handleFilterClick(null)}
            className={`text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-9 transition-colors whitespace-nowrap ${
              selectedFilter === null
                ? "bg-[#2885AC] text-white border-[#2885AC]"
                : "text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#2885AC] hover:text-white hover:border-[#2885AC]"
            }`}
          >
            الكل
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterClick("arabic")}
            className={`text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 transition-colors ${
              selectedFilter === "arabic"
                ? "bg-[#2885AC] text-white border-[#2885AC]"
                : "text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#2885AC] hover:text-white hover:border-[#2885AC]"
            }`}
          >
            <span className="hidden xs:inline">ملخصات رسائل ماجستير ودكتوراة عربي</span>
            <span className="xs:hidden">عربي</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleFilterClick("english")}
            className={`text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 transition-colors ${
              selectedFilter === "english"
                ? "bg-[#2885AC] text-white border-[#2885AC]"
                : "text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#2885AC] hover:text-white hover:border-[#2885AC]"
            }`}
          >
            <span className="hidden xs:inline">ملخصات رسائل ماجستير ودكتوراة اجنبي</span>
            <span className="xs:hidden">اجنبي</span>
          </Button>
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
                        key={`library-${offset + index}`}
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
                      لا توجد عناصر متاحة
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
        </div>
      </div>
    </div>
  );
}
