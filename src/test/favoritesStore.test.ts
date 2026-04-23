import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from '../store/favoritesStore'
import { mockCharacter } from './mocks'

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('debería agregar un favorito', () => {
    useFavoritesStore.getState().addFavorite(mockCharacter)
    expect(useFavoritesStore.getState().favorites).toHaveLength(1)
    expect(useFavoritesStore.getState().favorites[0].id).toBe(1)
  })

  it('no debería agregar favoritos duplicados', () => {
    useFavoritesStore.getState().addFavorite(mockCharacter)
    useFavoritesStore.getState().addFavorite(mockCharacter)
    expect(useFavoritesStore.getState().favorites).toHaveLength(1)
  })

  it('debería eliminar un favorito', () => {
    useFavoritesStore.getState().addFavorite(mockCharacter)
    useFavoritesStore.getState().removeFavorite(1)
    expect(useFavoritesStore.getState().favorites).toHaveLength(0)
  })

  it('debería activar un favorito con toggle', () => {
    useFavoritesStore.getState().toggleFavorite(mockCharacter)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)
  })

  it('debería desactivar un favorito con toggle', () => {
    useFavoritesStore.getState().toggleFavorite(mockCharacter)
    useFavoritesStore.getState().toggleFavorite(mockCharacter)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(false)
  })

  it('debería verificar isFavorite correctamente', () => {
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(false)
    useFavoritesStore.getState().addFavorite(mockCharacter)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)
  })
})
