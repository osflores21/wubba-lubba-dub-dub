import { Button, Stack, Group } from '@mantine/core'
import { StarIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FilterSearch, { type FilterValues } from '../components/FilterSearch'
import CharacterGrid from '../components/CharacterGrid'
import CharacterPagination from '../components/CharacterPagination'
import { useCharacters } from '../hooks/useServices'

export default function Home() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<FilterValues>({ name: '', status: '' })
  const [page, setPage] = useState(1)

  const handleFiltersChange = (next: FilterValues) => {
    setFilters(next)
    setPage(1)
  }

  const { data, isLoading } = useCharacters({
    page,
    name: filters.name || undefined,
    status: filters.status || undefined,
  })

  return (
    <Stack my="lg" gap="md">
      <Group w="100%" wrap="nowrap" justify="space-between">
        <Group wrap="nowrap" style={{ flex: 1 }}>
          <FilterSearch value={filters} onChange={handleFiltersChange} />
        </Group>
        <Button
          variant="outline"
          color="gold"
          leftSection={<StarIcon size={16} />}
          onClick={() => navigate('/favoritos')}
        >
          Ver favoritos
        </Button>
      </Group>

      <CharacterGrid characters={data?.results} loading={isLoading} />

      <CharacterPagination info={data?.info} page={page} onPageChange={setPage} />
    </Stack>
  )
}
