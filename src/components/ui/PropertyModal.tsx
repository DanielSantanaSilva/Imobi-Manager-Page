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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <img
          src={property.image || '/placeholder.jpg'}
          alt={`Imagem de ${property.name}`}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{property.name}</h2>
        <p className="text-gray-600">R${property.price}</p>
        <p className="text-gray-500">
          {property.address.street}, {property.address.number}, {property.address.complement}, 
          {property.address.city}, {property.address.state} - {property.address.zipCode}, {property.address.country}
        </p>
        <p className="mt-4">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyModal;
