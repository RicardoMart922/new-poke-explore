import { getTypeColor } from "@/utils/pokemon";

interface Props {
  name: string;
  id: number;
  types: { type: { name: string } }[];
}

export function PokemonHeaderInfo({ name, id, types }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold capitalize">{name}</h2>
      <span className="text-sm text-gray-500">ID #{id}</span>
      <div className="flex gap-2 justify-center my-2 flex-wrap">
        {types.map((pokemonType, index) => {
          const typeName = pokemonType.type.name;
          return (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(typeName)}`}
            >
              {typeName}
            </span>
          );
        })}
      </div>
    </div>
  );
}
