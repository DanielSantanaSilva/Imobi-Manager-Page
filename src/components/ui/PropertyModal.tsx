import React from 'react';

interface Property {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    number: string;
    complement: string;
  };
}

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-labelledby="property-modal-title"
      aria-describedby="property-modal-description"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
        {/* Botão para fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Fechar modal"
        >
          X
        </button>

        {/* Imagem */}
        <img
          src={property.image || '/placeholder.jpg'}
          alt={`Imagem de ${property.name}`}
          className="w-full h-48 object-cover rounded mb-4"
        />

        {/* Título */}
        <h2
          id="property-modal-title"
          className="text-2xl font-bold mb-2"
        >
          {property.name}
        </h2>

        {/* Preço */}
        <p className="text-lg text-gray-600 font-semibold mb-4">
          R$ {Number(property.price).toLocaleString('pt-BR')}
        </p>

        {/* Endereço */}
        <p className="text-gray-500 mb-4">
          {property.address.street}, {property.address.number}
          {property.address.complement && `, ${property.address.complement}`}<br />
          {property.address.city}, {property.address.state} - {property.address.zipCode}<br />
          {property.address.country}
        </p>

        {/* Descrição */}
        <p id="property-modal-description" className="text-gray-700 leading-relaxed">
          {property.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyModal;
