import { useEffect, useState } from 'react'
import { TextInput, Select } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { STATUS_OPTIONS } from '../constants'
import type { ICharacterFilters } from '../types/api.type'

export interface FilterValues {
  name: string
  status: ICharacterFilters['status'] | ''
}

interface FilterSearchProps {
  value: FilterValues
  onChange: (value: FilterValues) => void
}

function FilterSearch({ value, onChange }: FilterSearchProps) {
  const [localName, setLocalName] = useState(value.name)
  const [debouncedName] = useDebouncedValue(localName, 400)

  useEffect(() => {
    const trimmed = debouncedName.trim()
    if (trimmed !== value.name) {
      onChange({ ...value, name: trimmed })
    }
  }, [debouncedName])

  return (
    <>
      <TextInput
        placeholder="Busca un personaje por: Nombre"
        leftSection={<MagnifyingGlassIcon size={16} />}
        value={localName}
        onChange={(e) => setLocalName(e.currentTarget.value)}
        style={{ flex: 1 }}
      />
      <Select
        placeholder="Estado"
        data={STATUS_OPTIONS}
        value={value.status}
        onChange={(v) =>
          onChange({ ...value, status: (v ?? '') as FilterValues['status'] })
        }
        clearable
        w={130}
      />
    </>
  )
}

export default FilterSearch
