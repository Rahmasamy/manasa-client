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
  const router = useRouter();

  const itemsPerPage = 8; // 3 columns × 4 rows

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
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center px-4">
        <h2 className="text-center text-white font-bold text-2xl sm:text-3xl lg:text-5xl p-3 sm:p-5">
          المكتبة الألكترونية{" "}
        </h2>
        <p className="text-center text-white font-bold text-base sm:text-lg lg:text-xl p-3 sm:p-5">
          {filteredLibraryItems.length} عنصر
        </p>
      </div>
      <div className="w-full px-4 sm:px-8 lg:px-24 py-6 sm:py-10">
        <div className="w-full flex flex-wrap justify-start gap-2 sm:gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => handleFilterClick(null)}
            className={`text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 lg:px-9 transition-colors ${
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
            className={`text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 lg:px-9 transition-colors ${
              selectedFilter === "arabic"
                ? "bg-[#2885AC] text-white border-[#2885AC]"
                : "text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#2885AC] hover:text-white hover:border-[#2885AC]"
            }`}
          >
            ملخصات رسائل ماجستير ودكتوراة عربي
          </Button>

          <Button
            variant="outline"
            onClick={() => handleFilterClick("english")}
            className={`text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 lg:px-9 transition-colors ${
              selectedFilter === "english"
                ? "bg-[#2885AC] text-white border-[#2885AC]"
                : "text-[#27272A] bg-white border border-[#4a4f52] hover:bg-[#2885AC] hover:text-white hover:border-[#2885AC]"
            }`}
          >
            ملخصات رسائل ماجستير ودكتوراة اجنبي
          </Button>
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
                    <div className="col-span-full text-center text-gray-600 py-8">
                      لا توجد عناصر متاحة
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
