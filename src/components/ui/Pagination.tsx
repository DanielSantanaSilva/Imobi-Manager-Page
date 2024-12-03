import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Anterior
      </button>
      <span className="text-lg">{`Página ${currentPage} de ${totalPages}`}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;