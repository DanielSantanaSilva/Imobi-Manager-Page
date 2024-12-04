'use client';

import React, { useEffect, useState } from 'react';
import Input from '../components/ui/Input';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import { z } from 'zod';

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
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    address: {
      zipCode: '',
      country: 'Brazil',
      number: '',
      complement: '',
    },
    constructorId: 1,
  });

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
    setSelectedProperty(property); 
  };

  const handleCloseModal = () => {
    setSelectedProperty(null); 
    setIsModalOpen(false); 
  };

  const handleOpenCreateModal = () => {
    setIsModalOpen(true); // Abrir o modal de criação
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id, value } = e.target;
  
    if (name === 'address') {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [id]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prevState => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  // Validação com Zod
  const propertySchema = z.object({
    name: z.string().min(1, 'O nome da propriedade é obrigatório'),
    price: z.number().min(1, 'O preço deve ser maior que 0'),
    bedrooms: z.number().min(1, 'A propriedade deve ter pelo menos 1 quarto'),
    bathrooms: z.number().min(1, 'A propriedade deve ter pelo menos 1 banheiro'),
    description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
    address: z.object({
      zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato 08255-210'),
      country: z.string().min(1, 'O país é obrigatório'),
      number: z.string().min(1, 'O número do endereço é obrigatório'),
      complement: z.string().optional(),
    }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validando os dados antes de enviar
      propertySchema.parse(formData);

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsModalOpen(false);
        fetchProperties();
      } else {
        console.error('Erro ao cadastrar propriedade');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Erros de validação:', error.errors);
      } else {
        console.error('Erro ao fazer requisição:', error);
      }
    }
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

      <footer className="bg-gray-800 text-white text-center py-4 mt-4">
        <p>&copy; 2024 Imobi Manager. Todos os direitos reservados.</p>
      </footer>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">Cadastrar Nova Propriedade</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Preço
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Quartos</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Banheiros</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
                <input
                  type="text"
                  id="zipCode"
                  name="address" // Crucial para identificar campos aninhados
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.address.number}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={formData.address.complement}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Cadastrar
                </button>
              </div>
            </form>
        </Modal>
      )}
    </div>
  );
};

export default Page;
