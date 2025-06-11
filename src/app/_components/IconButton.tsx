import React, { ReactNode } from "react";

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
}

export function IconButton({ onClick, ariaLabel, children }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {children}
    </button>
  );
}
