import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import ModalDetail from '../components/ModalDetail'
import { render } from './test-utils'
import { useFavoritesStore } from '../store/favoritesStore'
import { mockCharacter } from './mocks'

vi.mock('../hooks/useServices', () => ({
  useCharacter: (id: number | null) => ({
    data: id ? mockCharacter : null,
    isLoading: false,
  }),
  useCharacters: () => ({
    data: undefined,
    isLoading: false,
  }),
}))

describe('ModalDetail', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('muestra los detalles del personaje al abrirse', async () => {
    render(<ModalDetail id={1} opened={true} onClose={() => {}} />)
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
  })

  it('muestra el botón "Añadir a favoritos" cuando no es favorito', async () => {
    render(<ModalDetail id={1} opened={true} onClose={() => {}} />)
    await waitFor(() => {
      expect(screen.getByText('Añadir a favoritos')).toBeInTheDocument()
    })
  })

  it('muestra el botón "Eliminar de favoritos" cuando es favorito', async () => {
    useFavoritesStore.setState({ favorites: [mockCharacter] })
    render(<ModalDetail id={1} opened={true} onClose={() => {}} />)
    await waitFor(() => {
      expect(screen.getByText('Eliminar de favoritos')).toBeInTheDocument()
    })
  })
})
