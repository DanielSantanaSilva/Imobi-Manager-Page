import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  // Fechar o modal quando o usuário clicar fora do modal
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      onClose();
    }
  };

  // Fechar o modal ao pressionar a tecla ESC
  useEffect(() => {
    const handleEsc = (e: { key: string; }) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white p-6 rounded shadow-lg max-w-md w-full relative ${className}`}
        onClick={(e) => e.stopPropagation()} // Impede o clique dentro do modal fechar ele
        role="dialog"
        aria-labelledby="modal-title"
        aria-hidden={!isOpen}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;

