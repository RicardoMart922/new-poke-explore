type SearchResponse = {
  success: boolean;
  message?: string;
  pokemon?: any; 
}

export async function searchAction(_prevState: SearchResponse | null, formData: FormData): Promise<SearchResponse> {
  try {
    const pokemon = formData.get("pokemon")?.toString().toLowerCase();

    if (!pokemon) {
      return {
        success: false,
        message: 'Pokemon name is required',
      };
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      return {
        success: false,
        message: 'Pokemon not found',
      };
    }

    const data = await response.json();

    return {
      success: true,
      pokemon: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}
