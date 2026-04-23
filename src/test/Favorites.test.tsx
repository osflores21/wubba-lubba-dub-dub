import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import Favorites from '../pages/Favorites'
import { render } from './test-utils'
import { useFavoritesStore } from '../store/favoritesStore'
import { mockCharacter, mockCharacter2 } from './mocks'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

vi.mock('../hooks/useServices', () => ({
  useCharacter: () => ({ data: null, isLoading: false }),
  useCharacters: () => ({ data: undefined, isLoading: false }),
}))

describe('Página de Favoritos', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
    navigateMock.mockClear()
  })

  it('muestra el mensaje vacío cuando no hay favoritos', () => {
    render(<Favorites />)
    expect(
      screen.getByText(/No tienes personajes favoritos/i),
    ).toBeInTheDocument()
  })

  it('lista los personajes marcados como favoritos', () => {
    useFavoritesStore.setState({ favorites: [mockCharacter, mockCharacter2] })
    render(<Favorites />)
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Morty Smith')).toBeInTheDocument()
  })

  it('regresa a la página anterior al hacer click en "Regresar"', () => {
    render(<Favorites />)
    fireEvent.click(screen.getByRole('button', { name: /regresar/i }))
    expect(navigateMock).toHaveBeenCalledWith(-1)
  })
})
