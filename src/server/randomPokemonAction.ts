'use server';

import { SearchResponse } from "@/types/type";

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

    const pokemon = await response.json();

    return {
      success: true,
      pokemon,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar Pokémon aleatório. Tente novamente.',
    };
  }
}
