import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Genre } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getGenreString = (genre: string, genres : Genre[]) => {
  const _genre = genres.find((g) => g.code == genre)?.name;

  return _genre ? _genre : genre;
};