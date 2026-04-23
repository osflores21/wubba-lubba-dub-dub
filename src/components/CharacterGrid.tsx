import { SimpleGrid, Box, Text } from '@mantine/core'
import { useState } from 'react'
import CharacterCard from './CharacterCard'
import ModalDetail from './ModalDetail'
import SkeletonCard from './UI/SkeletonCard'
import type { ICharacter } from '../types/api.type'

interface CharacterGridProps {
  characters: ICharacter[] | undefined
  loading: boolean
  emptyMessage?: string
}

export default function CharacterGrid({
  characters,
  loading,
  emptyMessage = 'No hay personajes para mostrar',
}: CharacterGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (loading) {
    return <SkeletonCard />
  }

  if (!characters || characters.length === 0) {
    return (
      <Box style={{ textAlign: 'center', padding: '2rem' }}>
        <Text c="dimmed">{emptyMessage}</Text>
      </Box>
    )
  }

  return (
    <Box w="100%">
      <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4 }} spacing="md" w="100%">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedId(character.id)}
          />
        ))}
      </SimpleGrid>

      <ModalDetail
        id={selectedId}
        opened={selectedId !== null}
        onClose={() => setSelectedId(null)}
      />
    </Box>
  )
}
