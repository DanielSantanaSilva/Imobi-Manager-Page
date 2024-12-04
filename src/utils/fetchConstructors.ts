export const fetchConstructors = async () => {
    try {
      const response = await fetch('http://localhost:3000/constructors'); 
      if (!response.ok) {
        throw new Error(`Erro ao buscar propriedades: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao buscar propriedades:', error.message); 
      } else {
        console.error('Erro ao buscar propriedades:', error); 
      }
      throw error; 
    }
  };
  