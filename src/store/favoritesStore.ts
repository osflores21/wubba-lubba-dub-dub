import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ICharacter } from '../types/api.type'
import { FAVORITES_STORAGE_KEY } from '../constants'

interface FavoritesState {
  favorites: ICharacter[]
  addFavorite: (character: ICharacter) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (character: ICharacter) => void
  isFavorite: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (character) =>
        set((state) =>
          state.favorites.some((c) => c.id === character.id)
            ? state
            : { favorites: [...state.favorites, character] },
        ),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== id),
        })),
      toggleFavorite: (character) =>
        set((state) => {
          const exists = state.favorites.some((c) => c.id === character.id)
          return {
            favorites: exists
              ? state.favorites.filter((c) => c.id !== character.id)
              : [...state.favorites, character],
          }
        }),
      isFavorite: (id) => get().favorites.some((c) => c.id === id),
    }),
    { name: FAVORITES_STORAGE_KEY },
  ),
)
