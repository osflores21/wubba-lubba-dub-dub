import type {
  IApiResponse,
  ICharacter,
  ICharacterFilters,
} from "../types/api.type";
import { axiosInstance } from "./config";

export const getSingleCharacter = async (id: number): Promise<ICharacter> => {
  const data = await axiosInstance.get<ICharacter>(`/api/character/${id}`);
  return data.data;
};

export const getCharacters = async (
  filters: ICharacterFilters = {},
): Promise<IApiResponse> => {
  const data = await axiosInstance.get<IApiResponse>(`/api/character`, {
    params: {
      name: filters.name || undefined,
      status: filters.status || undefined,
      species: filters.species || undefined,
      type: filters.type || undefined,
      gender: filters.gender || undefined,
      page: filters.page || undefined,
    },
  });
  return data.data;
};
