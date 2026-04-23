import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import FilterSearch from '../components/FilterSearch'
import { render } from './test-utils'

describe('FilterSearch', () => {
  it('emite el nuevo estado al cambiar el select de status', () => {
    const onChange = vi.fn()
    render(
      <FilterSearch value={{ name: '', status: '' }} onChange={onChange} />,
    )
    fireEvent.click(screen.getByPlaceholderText('Estado'))
    fireEvent.click(screen.getByText('Alive'))
    expect(onChange).toHaveBeenCalledWith({ name: '', status: 'alive' })
  })

  it('emite el nombre con debounce y trim al escribir', async () => {
    const onChange = vi.fn()
    render(
      <FilterSearch value={{ name: '', status: '' }} onChange={onChange} />,
    )
    const input = screen.getByPlaceholderText(/Busca un personaje/i)
    fireEvent.change(input, { target: { value: '  rick  ' } })

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith({ name: 'rick', status: '' })
      },
      { timeout: 1500 },
    )
  })

  it('no emite cambios si el nombre trimmed coincide con el actual', async () => {
    const onChange = vi.fn()
    render(
      <FilterSearch value={{ name: 'rick', status: '' }} onChange={onChange} />,
    )
    // valor inicial "rick" == debouncedName inicial "rick" después del mount
    await new Promise((r) => setTimeout(r, 500))
    expect(onChange).not.toHaveBeenCalled()
  })
})
