const currentPage = 1;
const priceRange = { min: 100000, max: 500000 };
const rooms = 3;
const bathrooms = 2;
const location = 'New York';

export const fetchProperties = async (data?: any) => {
    try {
      const queryParams = new URLSearchParams({
        page: String(currentPage),
        priceMin: String(priceRange.min),
        priceMax: String(priceRange.max),
        rooms: String(rooms || ''),
        bathrooms: String(bathrooms || ''),
        location: String(location),
        timestamp: String(new Date().getTime()),
      }).toString();
  
      const response = await fetch(`/api/properties?${queryParams}`);
      const data = await response.json();
      fetchProperties(data.data);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
    }
  };
  
  
  
  fetchProperties();
  