"use client";

import { PokemonType } from "@/types/type";
import { PokemonBasicInfo } from "./PokemonBasicInfo";
import { PokemonSpriteCarousel } from "./PokemonSpriteCarousel";
import { PokemonHeaderInfo } from "./PokemonHeaderInfo";

interface Props {
  pokemon: PokemonType;
}

export function PokemonCard({ pokemon }: Props) {
  const spriteList = [
    { label: "Frontal", src: pokemon.sprites.front_default },
    { label: "Costas", src: pokemon.sprites.back_default },
    { label: "Frontal Shiny", src: pokemon.sprites.front_shiny },
    { label: "Costas Shiny", src: pokemon.sprites.back_shiny },
  ].filter(sprite => sprite.src);

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4 text-black">
      <div className="flex flex-col items-center text-center">
        <PokemonSpriteCarousel name={pokemon.species.name} sprites={spriteList} />

        <PokemonHeaderInfo name={pokemon.species.name} id={pokemon.id} types={pokemon.types} />

        <PokemonBasicInfo weight={pokemon.weight} height={pokemon.height} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 text-sm">Stats Base:</h3>
        <ul className="space-y-1 text-sm">
          {pokemon.stats.map((pokemonStats, index) => (
            <li key={index} className="flex justify-between">
              <span className="capitalize">{pokemonStats.stat.name}</span>
              <span className="font-semibold">{pokemonStats.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
