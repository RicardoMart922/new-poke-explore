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
