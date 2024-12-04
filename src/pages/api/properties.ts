import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { 
      page = 1, // Página padrão
      priceMin, 
      priceMax, 
      rooms, 
      bathrooms, 
      location 
    } = req.query;

    // Construir os parâmetros de consulta
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(page));
    if (priceMin) queryParams.append('priceMin', String(priceMin));
    if (priceMax) queryParams.append('priceMax', String(priceMax));
    if (rooms) queryParams.append('rooms', String(rooms));
    if (bathrooms) queryParams.append('bathrooms', String(bathrooms));
    if (location) queryParams.append('location', String(location));

    // Consultar a API principal
    const response = await fetch(`http://localhost:3000/properties?${queryParams}`);

    if (!response.ok) {
      throw new Error(`Falha ao buscar propriedades: ${response.statusText}`);
    }

    const propertiesData = await response.json();

    // Configuração de paginação
    const propertiesPerPage = 9; // Por padrão, 9 itens por página
    const pageNumber = Number(page);
    const startIndex = (pageNumber - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const paginatedData = propertiesData.slice(startIndex, endIndex);

    res.status(200).json({
      data: paginatedData,
      pagination: {
        currentPage: pageNumber,
        itemsPerPage: propertiesPerPage,
        totalItems: propertiesData.length,
        totalPages: Math.ceil(propertiesData.length / propertiesPerPage)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar as propriedades:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar propriedades', 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    });
  }
};

export default handler;
