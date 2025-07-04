export type PokemonType = {
  id: number;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
  };
  species: {
    name: string;
  };
  abilities: {
    ability: {
      name: string;
    }
  }[];
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
  evolutions?: PokemonType[];
}

export type EvolutionNode = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}
