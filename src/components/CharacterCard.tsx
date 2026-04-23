import { Card, Image, Text, ActionIcon } from '@mantine/core'
import { StarIcon } from '@phosphor-icons/react'
import { useFavoritesStore } from '../store/favoritesStore'
import type { ICharacter } from '../types/api.type'

interface CharacterCardProps {
  character: ICharacter
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const favorite = useFavoritesStore((s) =>
    s.favorites.some((c) => c.id === character.id),
  )

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(character)
  }

  return (
    <Card
      shadow="sm"
      padding="md"
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={onClick}
    >
      <Card.Section p="md">
        <Image src={character.image} h={160} alt={character.name} fit="contain" />
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
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      >
        {favorite ? (
          <StarIcon color="gold" size={20} weight="fill" />
        ) : (
          <StarIcon color="gray" size={20} weight="regular" />
        )}
      </ActionIcon>
    </Card>
  )
}
