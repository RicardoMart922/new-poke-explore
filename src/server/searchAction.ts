"use server";

import { SearchResponse } from "@/types/type";
import { getPokemonEvolutionsFromSpeciesUrl } from "@/utils/pokemon";

export async function searchAction(
  _prevState: SearchResponse | null,
  formData: FormData
): Promise<SearchResponse> {
  try {
    const pokemonName = formData.get("pokemon")?.toString().toLowerCase();

    if (!pokemonName) {
      return {
        success: false,
        message: "Pokemon name is required",
      };
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      return {
        success: false,
        message: "Pokemon not found",
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
      message: "Internal server error",
    };
  }
}
