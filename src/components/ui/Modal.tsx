import React, { useEffect, MouseEvent, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  descriptionId?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  title = 'Cadastrar nova propriedade',
  descriptionId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent closing when clicking inside the modal
  const handleModalContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      onClose();
    }
  };

  // Close modal on Escape key press and manage body scroll
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = '';
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      disableScroll();

      // Focus on the modal content
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      enableScroll();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${className}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative focus:outline-none sm:max-w-lg md:max-w-xl"
        onClick={handleModalContentClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={descriptionId}
        tabIndex={-1}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
