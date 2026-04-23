import { useState } from "react";
import {
  getFilteredCharacters,
  getListCharacters,
  getSingleCharacter,
} from "../services/services.api";
import type { ICharacter, ICharacterFilters, IInfo } from "../types/api.type";

export const useGetListCharacters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>();
  const [loading, setLoading] = useState(false);
  const listCharacter = async () => {
    try {
      setLoading(true);
      const data = await getListCharacters({});
      setCharacters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { listCharacter, characters, loading };
};

export const useSingleCharacter = (id: number) => {
  const [character, setCharacter] = useState<ICharacter>();
  const [loading, setLoading] = useState(false);
  const singleCharacter = async () => {
    try {
      setLoading(true);
      const data = await getSingleCharacter(id);
      setCharacter(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { character, singleCharacter, loading };
};

export const useFilterCharacters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>();
  const [info, setInfo] = useState<IInfo>();
  const [loading, setLoading] = useState(false);

  const filterCharacters = async (filters: ICharacterFilters) => {
    try {
      setLoading(true);
      const data = await getFilteredCharacters(filters);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.log(error);
      setCharacters([]);
      setInfo(undefined);
    } finally {
      setLoading(false);
    }
  };

  return { characters, info, filterCharacters, loading };
};
