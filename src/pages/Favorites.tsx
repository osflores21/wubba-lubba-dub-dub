import { Button, Group, Stack, Title } from '@mantine/core'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import CharacterGrid from '../components/CharacterGrid'
import { useFavoritesStore } from '../store/favoritesStore'

export default function Favorites() {
  const navigate = useNavigate()
  const favorites = useFavoritesStore((s) => s.favorites)

  return (
    <Stack my="lg" gap="md">
      <Group>
        <Button
          variant="subtle"
          leftSection={<ArrowLeftIcon size={16} />}
          onClick={() => navigate(-1)}
        >
          Regresar
        </Button>
      </Group>

      <Title order={2} ta="center">Mis Favoritos</Title>

      <CharacterGrid
        characters={favorites}
        loading={false}
        emptyMessage="No tienes personajes favoritos aún. ¡Añade algunos desde la lista principal!"
      />
    </Stack>
  )
}
