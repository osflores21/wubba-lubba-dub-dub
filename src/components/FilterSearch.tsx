import { useEffect, useState } from 'react'
import { TextInput, Select } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import type { ICharacter, ICharacterFilters, IInfo } from '../types/api.type'
import { useFilterCharacters } from '../hooks/useServices'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

interface FilterSearchProps {
  page: number
  onResults: (characters: ICharacter[], info: IInfo | undefined, loading: boolean) => void
  onFiltersChange: () => void
}

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
]

function FilterSearch({ page, onResults, onFiltersChange }: FilterSearchProps) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [debouncedName] = useDebouncedValue(name, 400)

  const { filterCharacters, characters, info, loading } = useFilterCharacters()

  useEffect(() => {
    const filters: ICharacterFilters = { page }
    if (debouncedName) filters.name = debouncedName
    if (status) filters.status = status as ICharacterFilters['status']
    filterCharacters(filters)
  }, [debouncedName, status, page])

  useEffect(() => {
    onResults(characters ?? [], info, loading)
  }, [characters, info, loading])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
    onFiltersChange()
  }

  const handleStatusChange = (val: string | null) => {
    setStatus(val ?? '')
    onFiltersChange()
  }

  return (
    <>
      <TextInput
        placeholder="Busca un personaje por: Nombre"
        leftSection={<MagnifyingGlassIcon size={16} />}
        value={name}
        onChange={handleNameChange}
        style={{ flex: 1 }}
      />
      <Select
        placeholder="Estado"
        data={STATUS_OPTIONS}
        value={status}
        onChange={handleStatusChange}
        clearable
        w={130}
      />
    </>
  )
}

export default FilterSearch