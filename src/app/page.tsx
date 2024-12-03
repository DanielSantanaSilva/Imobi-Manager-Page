'use client';

import React, { useEffect, useState } from 'react';
import Input from '../components/ui/Input';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal'; 

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

const Page = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [rooms, setRooms] = useState<number | undefined>(undefined);
  const [bathrooms, setBathrooms] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchProperties = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: String(currentPage),
        priceMin: String(priceRange.min),
        priceMax: String(priceRange.max),
        rooms: String(rooms || ''),
        bathrooms: String(bathrooms || ''),
        location,
      }).toString();

      const response = await fetch(`/api/properties?${queryParams}`);
      const data = await response.json();
      setProperties(data.data);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [currentPage, priceRange, rooms, bathrooms, location]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property); // Abrir o modal com a propriedade selecionada
  };

  const handleCloseModal = () => {
    setSelectedProperty(null); 
  };

  const handleOpenCreateModal = () => {
    setIsModalOpen(true); // Abre o modal de cadastro
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Imobi Manager</h1>
      </header>

      <main className="p-4">
        <section className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
        <Input
          label="Localização"
          name="location"
          id="location"
          value={location}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLocation(e.target.value)}
          placeholder="Cidade, Estado..."
        />
        <Input
          label="Preço Mínimo"
          name="priceMin"
          id="priceMin"
          value={priceRange.min}
          onChange={(e: { target: { value: any; }; }) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
          type="number"
          placeholder="Preço mínimo"
        />
        <Input
          label="Preço Máximo"
          name="priceMax"
          id="priceMax"
          value={priceRange.max}
          onChange={(e: { target: { value: any; }; }) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
          type="number"
          placeholder="Preço máximo"
        />
        <Input
          label="Quartos"
          name="rooms"
          id="rooms"
          value={rooms || ''}
          onChange={(e: { target: { value: any; }; }) => setRooms(Number(e.target.value))}
          type="number"
          placeholder="Número de quartos"
        />
        <Input
          label="Banheiros"
          name="bathrooms"
          id="bathrooms"
          value={bathrooms || ''}
          onChange={(e: { target: { value: any; }; }) => setBathrooms(Number(e.target.value))}
          type="number"
          placeholder="Número de banheiros"
        />
        <div className="flex justify-end col-span-full sm:col-span-2 lg:col-span-3">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 sm:mt-0"
            onClick={handleOpenCreateModal}
          >
            Cadastrar Propriedade
          </button>
        </div>
      </section>


        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <article
              key={property.id}
              className="bg-white shadow-md rounded p-4 flex flex-col cursor-pointer"
              onClick={() => handlePropertyClick(property)} // Abre o modal ao clicar
            >
              <img
                src={property.image || '/placeholder.jpg'}
                alt="Imagem da propriedade"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{property.name}</h2>
              <p className="text-gray-600">R${property.price}</p>
            </article>
          ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        © 2024 Imobi Manager
      </footer>

      {/* Exibir o modal de propriedade se uma propriedade for selecionada */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>{selectedProperty.name}</h2>
            <button onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Exibir o modal de cadastro se estiver aberto */}
      <Modal isOpen={isModalOpen} onClose={handleCloseCreateModal}>
        <h2 className="text-xl font-bold">Cadastrar Nova Propriedade</h2>
        {/* Formulário de cadastro */}
        <form className="mt-4">
          <Input label="Nome da Propriedade" name="name" id="name" placeholder="Nome da propriedade" value="" onChange={() => {}} />
          <Input label="Preço" name="price" id="price" placeholder="Preço da propriedade" type="number" value="" onChange={() => {}} />
          <Input label="Descrição" name="description" id="description" placeholder="Descrição" value="" onChange={() => {}} />
          <Input label="Endereço" name="address" id="address" placeholder="Endereço completo" value="" onChange={() => {}} />
          <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
