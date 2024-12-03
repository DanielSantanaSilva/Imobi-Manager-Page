import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { page = 1 } = req.query; // Pega a página da query, padrão é 1
    const pageNumber = parseInt(page as string, 10);

    const response = await fetch('http://localhost:3000/properties'); // Endpoint da sua API
    const propertiesData = await response.json();

    // Paginação - 9 propriedades por página
    const propertiesPerPage = 9;
    const startIndex = (pageNumber - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;

    // Slice para pegar as propriedades da página atual
    const properties = propertiesData.slice(startIndex, endIndex);

    res.status(200).json({ data: properties });
  } catch (error) {
    console.error('Erro ao buscar as propriedades:', error);
    res.status(500).json({ message: 'Erro ao buscar propriedades' });
  }
};

export default handler;
