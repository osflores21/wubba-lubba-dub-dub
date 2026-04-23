import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import CharacterGrid from '../components/CharacterGrid'
import { render } from './test-utils'
import { useFavoritesStore } from '../store/favoritesStore'
import { mockCharacter, mockCharacter2 } from './mocks'

vi.mock('../hooks/useServices', () => ({
  useCharacter: () => ({
    data: mockCharacter,
    isLoading: false,
  }),
  useCharacters: () => ({
    data: undefined,
    isLoading: false,
  }),
}))

describe('CharacterGrid', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('muestra el mensaje vacío cuando no hay personajes', () => {
    render(<CharacterGrid characters={[]} loading={false} />)
    expect(screen.getByText('No hay personajes para mostrar')).toBeInTheDocument()
  })

  it('renderiza las tarjetas de personajes', () => {
    render(<CharacterGrid characters={[mockCharacter, mockCharacter2]} loading={false} />)
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Morty Smith')).toBeInTheDocument()
  })

  it('abre el modal al hacer click en una tarjeta', async () => {
    render(<CharacterGrid characters={[mockCharacter]} loading={false} />)
    fireEvent.click(screen.getByText('Rick Sanchez'))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})
