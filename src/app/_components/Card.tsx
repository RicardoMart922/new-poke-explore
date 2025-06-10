import Image from "next/image";
import { PokemonType } from "@/types/type";

interface Props {
  pokemon: PokemonType;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4 text-black">
      <div className="flex flex-col items-center text-center">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.species.name}
          width={100}
          height={100}
          priority
          className="h-32 w-32"
        />
        <h2 className="text-2xl font-bold capitalize">{pokemon.species.name}</h2>
        <span className="text-sm text-gray-500">ID #{pokemon.id}</span>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((t, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Altura:</span> {pokemon.height / 10} m
        </div>
        <div>
          <span className="font-semibold">Peso:</span> {pokemon.weight / 10} kg
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 text-sm">Stats Base:</h3>
        <ul className="space-y-1 text-sm">
          {pokemon.stats.map((s, index) => (
            <li key={index} className="flex justify-between">
              <span className="capitalize">{s.stat.name}</span>
              <span className="font-semibold">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
