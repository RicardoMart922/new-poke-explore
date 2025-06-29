import { EvolutionNode, PokemonType } from "@/types/type";

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: "bg-gray-300 text-gray-900",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-black",
    ice: "bg-cyan-300 text-black",
    fighting: "bg-orange-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-300 text-black",
    psychic: "bg-pink-400 text-white",
    bug: "bg-lime-500 text-black",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-indigo-700 text-white",
    dark: "bg-gray-800 text-white",
    dragon: "bg-indigo-600 text-white",
    steel: "bg-gray-400 text-black",
    fairy: "bg-pink-200 text-black",
  };

  return colors[type] || "bg-gray-200 text-black";
}

export async function getPokemonEvolutionsFromSpeciesUrl(
  speciesUrl: string
): Promise<PokemonType[]> {
  try {
    const speciesResponse = await fetch(speciesUrl);
    if (!speciesResponse.ok) throw new Error("Erro ao buscar species");
    const speciesData = await speciesResponse.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionRes = await fetch(evolutionChainUrl);
    if (!evolutionRes.ok) throw new Error("Erro ao buscar cadeia de evolução");
    const evolutionData = await evolutionRes.json();

    const evolutionNames: string[] = [];

    const traverse = (node: EvolutionNode) => {
      evolutionNames.push(node.species.name);
      if (node.evolves_to.length > 0) {
        traverse(node.evolves_to[0]);
      }
    };

    traverse(evolutionData.chain);

    const getPokemonFull = async (name: string): Promise<PokemonType | null> => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) return null;
      return await res.json();
    };

    const evolutionsRaw = await Promise.all(
      evolutionNames.map((name) => getPokemonFull(name))
    );

    return evolutionsRaw.filter(Boolean) as PokemonType[];
  } catch (error) {
    console.error("Erro ao buscar evoluções:", error);
    return [];
  }
}