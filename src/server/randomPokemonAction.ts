'use server';

import { SearchResponse } from "@/types/type";
import { getPokemonEvolutionsFromSpeciesUrl } from "@/utils/pokemon";

export async function randomPokemonAction(): Promise<SearchResponse> {
  const randomId = Math.floor(Math.random() * 1025) + 1;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(randomId)}`);

    if (!response.ok) {
      return {
        success: false,
        message: 'Pokemon not found',
      };
    }

    const data = await response.json();
    const evolutions = await getPokemonEvolutionsFromSpeciesUrl(data.species.url);

    return {
      success: true,
      pokemon: data,
      evolutions,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Erro ao buscar Pokémon aleatório. Tente novamente.',
    };
  }
}
