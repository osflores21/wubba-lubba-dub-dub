import { Text, SimpleGrid, Card, Image, ActionIcon, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useGetListCharacters } from '../hooks/useServices'
import SkeletonCard from './UI/SkeletonCard'
import { StarIcon } from '@phosphor-icons/react'
import ModalDetail from './ModalDetail'
import type { ICharacter } from '../types/api.type'

interface CharacterTableProps {
  filtered: ICharacter[] | null
  filterLoading: boolean
  showOnlyFavorites?: boolean
}

function CharacterTable({ filtered, filterLoading, showOnlyFavorites = false }: CharacterTableProps) {
  const { listCharacter, characters, loading } = useGetListCharacters()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('favoriteCharacters')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  useEffect(() => {
    listCharacter()
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteCharacters', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const isLoading = loading || filterLoading
  let displayList = filtered ?? characters

  // Filtrar solo favoritos si es necesario
  if (showOnlyFavorites && displayList) {
    displayList = displayList.filter((char) => favorites.has(char.id))
  }

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const newFavs = new Set(prev)
      if (newFavs.has(id)) {
        newFavs.delete(id)
      } else {
        newFavs.add(id)
      }
      return newFavs
    })
  }

  return (
    <Box w="100%">
      {isLoading && <SkeletonCard />}

      {displayList && displayList.length === 0 ? (
        <Box style={{ textAlign: 'center', padding: '2rem' }}>
          <Text c="dimmed">No hay personajes para mostrar</Text>
        </Box>
      ) : (
        <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4 }} spacing="md" w="100%">
          {displayList?.map((character) => {
            const isFavorite = favorites.has(character.id)
            return (
              <Card
                key={character.id}
                shadow="sm"
                padding="md"
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => setSelectedId(character.id)}
              >
                <Card.Section p="md">
                  <Image
                    src={character.image}
                    h={160}
                    alt={character.name}
                    fit="contain"
                  />
                </Card.Section>

                <Text ta="center" fw={500} size="md" mt="md" lineClamp={1}>
                  {character.name}
                </Text>

                <ActionIcon
                  variant="white"
                  radius="xl"
                  size="md"
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    boxShadow: '0 1px 4px rgba(0,0,0,.15)',
                  }}
                  onClick={(e) => toggleFavorite(character.id, e)}
                >
                  {isFavorite ? (
                    <StarIcon color="gold" size={20} weight="fill" />
                  ) : (
                    <StarIcon color="gray" size={20} weight="regular" />
                  )}
                </ActionIcon>
              </Card>
            )
          })}
        </SimpleGrid>
      )}

      <ModalDetail
        id={selectedId}
        opened={selectedId !== null}
        onClose={() => setSelectedId(null)}
      />
    </Box>
  )
}

export default CharacterTable