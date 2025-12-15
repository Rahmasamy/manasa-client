'use client'

import { Button } from "@/components/ui/button";
import { allAcademicCards } from "@/src/lib/consts/academic-library/libraryCard";
import React, { useState } from "react";
import AcademicCard from "../../domain/AcademicCard/AcademicCard";
import ReactPaginate from 'react-paginate';

export default function ElectronicLibrary() {
      const [currentPage, setCurrentPage] = useState(0);
      
  const itemsPerPage = 8; // 3 columns × 4 rows
  const pageCount = Math.ceil(allAcademicCards.length / itemsPerPage);
//   const offset = currentPage * itemsPerPage;
//   const currentItems = allAcademicCards.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle card button click
  const handleCardClick = (card) => {
    console.log('Card clicked:', card);
    alert(`تم النقر على: ${card.title}`);
  };
  return (
    <div>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          المكتبة الألكترونية{" "}
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          25 دورة/ 7 اقسام
        </p>
      </div>
      <div className="w-full px-24 py-10">
      
        <div className="w-full flex justify-start pr-11 items-center">
          <Button variant="outline" className="m-3 px-9 py-4 hover:bg-[#2885AC]">
  ملخصات رسائل ماجستير ودكتوراة عربي
          </Button>

          <Button variant="outline" className="m-3 px-9 py-4 hover:bg-[#2885AC]">
  ملخصات رسائل ماجستير ودكتوراةاجنبي
          </Button>
        </div>
          <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto">
      
      

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allAcademicCards.map((card) => (
            <AcademicCard
              key={card.id}
              image={card.image}
              title={card.title}
              description={card.description}
              price={card.price}
              buttonText={card.buttonText}
              onButtonClick={() => handleCardClick(card)}
              date={card.date}
              writenBy={card.writenBy}
            />
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
      </div>
    </div>
  );
}
