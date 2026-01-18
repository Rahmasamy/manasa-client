"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderBanner from "@/src/components/domain/HeaderBanner/HeaderBanner";
import ArticleContent from "@/src/components/domain/ArticleContent/ArticleContent";
import {
  electronicLibraryApi,
  ApiElectronicLibrary,
} from "@/src/infrastructure/api/electronicLibraryApi";

export default function SingleElectronicLibrary() {
  const params = useParams();
  const libraryId = params?.id as string;

  const [libraryItem, setLibraryItem] = useState<ApiElectronicLibrary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraryItem = async () => {
      if (!libraryId) {
        setError("معرف العنصر غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await electronicLibraryApi.getLibraryItemById(
          libraryId
        );

        // Handle different response structures:
        // 1. Library item directly: {...}
        // 2. Wrapped in data: { data: {...} }
        // 3. Wrapped in library: { library: {...} }
        let itemData: ApiElectronicLibrary;

        if (
          response &&
          typeof response === "object" &&
          "id" in response &&
          "title" in response
        ) {
          // It's an ApiElectronicLibrary directly
          itemData = response as ApiElectronicLibrary;
        } else if ("data" in response && response.data) {
          itemData = response.data as ApiElectronicLibrary;
        } else if ("library" in response && response.library) {
          itemData = response.library as ApiElectronicLibrary;
        } else {
          throw new Error("Invalid library item response structure");
        }

        setLibraryItem(itemData);
      } catch (err) {
        console.error("Error fetching library item:", err);
        setError("فشل تحميل العنصر. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryItem();
  }, [libraryId]);

  // Determine text direction based on ResearchType
  const researchType = libraryItem?.ResearchType?.toLowerCase();
  const isEnglish =
    researchType === "english" ||
    researchType === "eng" ||
    researchType === "إنجليزي";
  const textDirection: "rtl" | "ltr" = isEnglish ? "ltr" : "rtl";

  // Services for header banner - translated based on language
  const services = isEnglish
    ? [
        "Comprehensive Electronic Library",
        "Scientific Research and Studies",
        "Master's and Doctoral Theses",
      ]
    : [
        "مكتبة إلكترونية شاملة",
        "أبحاث ودراسات علمية",
        "رسائل ماجستير ودكتوراه",
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

  if (error || !libraryItem) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir={textDirection}
      >
        <div className="text-lg text-red-600">
          {error || (isEnglish ? "Item not found" : "العنصر غير موجود")}
        </div>
      </div>
    );
  }

  // Format date based on language
  const formattedDate = isEnglish
    ? new Date(libraryItem.createdAt).toLocaleDateString("en-US")
    : new Date(libraryItem.createdAt).toLocaleDateString("ar-SA");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <HeaderBanner
        title={libraryItem.title}
        services={services}
        viewCount={0}
        direction={textDirection}
        backgroundImage={libraryItem.imageUrl || libraryItem.photoUrl || "/imgs/academic-guide.jpg"}
      />

      {/* Main Content Area */}
      <div className="container mx-auto flex flex-col lg:flex-row bg-white">
        {/* Sidebar - Left */}
        {/* <Sidebar /> */}

        {/* Library Item Content - Right */}
        <div className="flex-1 min-w-0">
          <ArticleContent
            categoryTitle={libraryItem.subTitle || libraryItem.title}
            date={formattedDate}
            author={libraryItem.author || (isEnglish ? "Unknown" : "مجهول")}
            articleTitle={libraryItem.title}
            articleText={libraryItem.content || libraryItem.description || ""}
            direction={textDirection}
          />
          <a
            href="//www.dmca.com/"
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
