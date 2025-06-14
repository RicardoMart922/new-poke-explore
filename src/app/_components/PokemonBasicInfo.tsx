interface Props {
  height: number;
  weight: number;
}

export function PokemonBasicInfo({ height, weight }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
      <div className="flex justify-center">
        <span className="font-semibold">Height: {height / 10} m</span>
      </div>
      <div className="flex justify-center">
        <span className="font-semibold">Weight: {weight / 10} kg</span>
      </div>
    </div>
  );
}
