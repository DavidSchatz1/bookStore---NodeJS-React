// components/PaginationWrapper.js
import React, { useState } from 'react';

function PaginationWrapper({ items, itemsPerPage, children }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function goToPrevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div>
      {children(currentItems)}

      <div className='pagination-bar'>
        <button className='button--warning' onClick={goToPrevPage} disabled={currentPage === 1}>
          הקודם
        </button>
        <span>
          עמוד {currentPage} מתוך {totalPages}
        </span>
        <button className='button--warning' onClick={goToNextPage} disabled={currentPage === totalPages}>
          הבא
        </button>
      </div>
    </div>
  );
}

export default PaginationWrapper;
