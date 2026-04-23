export interface ILocation {
  name: string;
  url: string;
}

export interface IOrigin {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: ILocation;
  origin: IOrigin;
  url: string;
  episode: string[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface IApiResponse {
  info: IInfo;
  results: ICharacter[];
}

export interface ICharacterFilters {
  name?: string;
  status?: "alive" | "dead" | "unknown";
  species?: string;
  type?: string;
  gender?: "female" | "male" | "genderless" | "unknown";
  page?: number;
}
