import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import CharacterCard from '../components/CharacterCard'
import { render } from './test-utils'
import { useFavoritesStore } from '../store/favoritesStore'
import { mockCharacter } from './mocks'

describe('CharacterCard', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('llama a onClick cuando se hace click en la tarjeta', () => {
    const handleClick = vi.fn()
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />)
    fireEvent.click(screen.getByText('Rick Sanchez'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('alterna el favorito al hacer click en la estrella', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />)
    const favButton = screen.getByLabelText('Añadir a favoritos')
    fireEvent.click(favButton)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)
  })

  it('muestra la estrella rellena cuando el personaje es favorito', () => {
    useFavoritesStore.getState().addFavorite(mockCharacter)
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />)
    expect(screen.getByLabelText('Eliminar de favoritos')).toBeInTheDocument()
  })
})
