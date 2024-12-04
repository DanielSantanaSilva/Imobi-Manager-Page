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

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    onPageChange(selectedPage);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
      {/* Botão Anterior */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Página anterior"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Anterior
      </button>

      {/* Informações e seletor de página */}
      <div className="flex items-center gap-2">
        <span className="text-lg">Página</span>
        <select
          value={currentPage}
          onChange={handlePageSelect}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Selecionar página"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <span className="text-lg">de {totalPages}</span>
      </div>

      {/* Botão Próximo */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
