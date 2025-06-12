"use client";

import { useActionState } from "react";
import { searchAction } from "@/server/searchAction";
import { PokemonCard } from "./Card";

export function FormSearchComponent() {
  const [state, stateFormAction, isPending] = useActionState(searchAction, null);

  return (
    <>
      <form
        action={stateFormAction}
        className="w-96 mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-5 border border-gray-200"
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
            placeholder="Número entre 1 e 1025"
            className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            disabled={isPending}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Searching..." : "Search"}
        </button>

        {state?.message && (
          <div
            className={`text-sm px-4 py-3 rounded-lg shadow-sm border ${
              state.success
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>

      {state?.success && state.pokemon && (
        <div className="mt-6">
          <PokemonCard pokemon={state.pokemon} />
        </div>
      )}
    </>
  );
}
