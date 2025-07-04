"use client";

import Image from "next/image";
import { PokemonType } from "@/types/type";
import { PokemonBasicInfo } from "./PokemonBasicInfo";
import { PokemonSpriteCarousel } from "./PokemonSpriteCarousel";
import { PokemonHeaderInfo } from "./PokemonHeaderInfo";

interface Props {
  pokemon: PokemonType;
  evolutions: PokemonType[];
}

export function PokemonCard({ pokemon, evolutions }: Props) {
  const spriteList = [
    { label: "Front", src: pokemon.sprites.front_default },
    { label: "Back", src: pokemon.sprites.back_default },
    { label: "Front Shiny", src: pokemon.sprites.front_shiny },
    { label: "Back Shiny", src: pokemon.sprites.back_shiny },
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
            <li key={index} className="flex items-center gap-2">
              <span className="w-[120px] capitalize">{pokemonStats.stat.name}</span>
              <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full"
                  style={{ width: `${Math.min(pokemonStats.base_stat, 100)}%` }}
                />
              </div>
              <span className="w-8 text-right font-semibold">{pokemonStats.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>

      {evolutions && evolutions.length > 1 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">Linha Evolutiva:</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {evolutions.map((evo) => (
              <div
                key={evo.id}
                className={`flex flex-col items-center text-center p-2 rounded-xl border bg-gray-50 shadow-sm min-w-[100px] ${
                  evo.id === pokemon.id ? "ring-2 ring-indigo-500" : ""
                }`}
              >
                <Image
                  src={evo.sprites.front_default}
                  alt={evo.species.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="capitalize text-xs mt-1 text-gray-700">{evo.species.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1 text-sm">
        <h3 className="font-semibold text-gray-800 text-sm">Abilities:</h3>
        <ul className="flex gap-2 flex-wrap">
          {pokemon.abilities.map((ability, index) => (
            <li
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize text-gray-700"
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full justify-end">
        <a
          href={`https://www.pokemon.com/br/pokedex/${pokemon.species.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:underline"
        >
          View in official Pokédex
        </a>
      </div>

    </div>
  );
}
