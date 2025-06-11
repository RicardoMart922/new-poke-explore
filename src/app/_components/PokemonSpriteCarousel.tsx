"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { IconButton } from "./IconButton";

type Sprite = {
  label: string;
  src: string;
};

interface Props {
  name: string;
  sprites: Sprite[];
  autoAdvance?: boolean;
  interval?: number;
}

export function PokemonSpriteCarousel({
  name,
  sprites,
  autoAdvance = true,
  interval = 3000,
}: Props) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setCurrent((prev) => (prev + 1) % sprites.length);
  const prev = () => setCurrent((prev) => (prev - 1 + sprites.length) % sprites.length);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoAdvance) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % sprites.length);
      }, interval);
    }
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sprites.length, autoAdvance, interval]);

  const handleManualNavigation = (direction: "prev" | "next") => {
    direction === "prev" ? prev() : next();
    resetInterval();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={sprites[current].src}
          alt={`${name} ${sprites[current].label}`}
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>
      <div className="flex gap-2 mb-2 min-w-[200px] justify-between items-center">
        <IconButton
          onClick={() => handleManualNavigation("prev")}
          ariaLabel="Sprite anterior"
        >
          <ArrowBigLeftDash className="text-indigo-500" />
        </IconButton>

        <span className="text-sm text-gray-600">{sprites[current].label}</span>
        
        <IconButton
          onClick={() => handleManualNavigation("next")}
          ariaLabel="Sprite proximo"
        >
          <ArrowBigRightDash className="text-indigo-500" />
        </IconButton>
      </div>
    </div>
  );
}
