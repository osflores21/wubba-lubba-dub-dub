import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCharacters, getSingleCharacter } from '../services/services.api'
import { axiosInstance } from '../services/config'
import { mockCharacter } from './mocks'

describe('services.api', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('getCharacters envía los filtros y devuelve los datos', async () => {
    const response = {
      data: {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [mockCharacter],
      },
    }
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue(response)

    const result = await getCharacters({ name: 'rick', page: 2, status: 'alive' })

    expect(getSpy).toHaveBeenCalledWith('/api/character', {
      params: expect.objectContaining({ name: 'rick', page: 2, status: 'alive' }),
    })
    expect(result).toEqual(response.data)
  })

  it('getCharacters omite los filtros indefinidos o vacíos', async () => {
    const getSpy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({
      data: { info: {}, results: [] },
    })

    await getCharacters({ page: 1 })

    const params = getSpy.mock.calls[0][1]?.params
    expect(params).toEqual({
      page: 1,
      name: undefined,
      status: undefined,
      species: undefined,
      type: undefined,
      gender: undefined,
    })
  })

  it('getSingleCharacter llama a la ruta correcta', async () => {
    const getSpy = vi
      .spyOn(axiosInstance, 'get')
      .mockResolvedValue({ data: mockCharacter })

    const result = await getSingleCharacter(1)

    expect(getSpy).toHaveBeenCalledWith('/api/character/1')
    expect(result).toEqual(mockCharacter)
  })
})
