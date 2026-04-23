import useSWR from "swr";
import { getCharacters, getSingleCharacter } from "../services/services.api";
import type { ICharacterFilters } from "../types/api.type";

export const useCharacters = (filters: ICharacterFilters) =>
  useSWR(["characters", filters] as const, ([, f]) => getCharacters(f), {
    keepPreviousData: true,
  });

export const useCharacter = (id: number | null) =>
  useSWR(id ? (["character", id] as const) : null, ([, i]) =>
    getSingleCharacter(i),
  );
