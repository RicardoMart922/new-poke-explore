"use client";

import { useActionState } from "react";
import { searchAction } from "@/server/searchAction";
import { randomPokemonAction } from "@/server/randomPokemonAction";
import { PokemonCard } from "./Card";

export function FormSearchComponent() {
  const [searchState, handleSearch, isSearching] = useActionState(searchAction, null);
  const [randomState, handleRandom, isRandoming] = useActionState(randomPokemonAction, null);

  const isPending = isSearching || isRandoming;
  const pokemon = searchState?.success
    ? searchState.pokemon
    : randomState?.success
    ? randomState.pokemon
    : null;

  return (
    <div className="w-96 mx-auto space-y-6">
      <form
        action={handleSearch}
        className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="pokemon"
            className="block text-sm font-semibold text-gray-700"
          >
            Number or name of Pokemon
          </label>
          <input
            type="text"
            id="pokemon"
            name="pokemon"
            placeholder="Number between 1 and 1025"
            className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            disabled={isPending}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>

        </div>
      </form>
      
      <form action={handleRandom} className="flex-1">
        <button
          type="submit"
          className="w-full px-4 py-2 text-indigo-600 font-medium bg-white border border-indigo-600 hover:bg-indigo-50 rounded-lg shadow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isRandoming ? "Drawing..." : "Surprise me"}
        </button>
      </form>

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}
