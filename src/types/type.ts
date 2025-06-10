export type PokemonType = {
  id: number;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
  }
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export type SearchResponse = {
  success: boolean;
  message?: string;
  pokemon?: PokemonType; 
}