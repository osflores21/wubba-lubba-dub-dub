import { Modal, Image, Text, Badge, Group, Stack, Divider, Skeleton, Button } from '@mantine/core'
import { StarIcon } from '@phosphor-icons/react'
import { useCharacter } from '../hooks/useServices'
import { useFavoritesStore } from '../store/favoritesStore'
import { STATUS_COLOR } from '../constants'

interface ModalDetailProps {
  id: number | null
  opened: boolean
  onClose: () => void
}

function ModalDetail({ id, opened, onClose }: ModalDetailProps) {
  const { data: character, isLoading } = useCharacter(opened ? id : null)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const favorite = useFavoritesStore((s) =>
    character ? s.favorites.some((c) => c.id === character.id) : false,
  )

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={character?.name ?? ''}
      centered
      size="sm"
      styles={{ title: { fontWeight: 600 } }}
    >
      {isLoading ? (
        <Stack gap="md">
          <Skeleton height={240} radius="md" />
          <Group justify="center">
            <Skeleton height={26} width={80} radius="xl" />
            <Skeleton height={26} width={80} radius="xl" />
          </Group>
          <Divider />
          {Array.from({ length: 4 }).map((_, i) => (
            <Group key={i} justify="space-between">
              <Skeleton height={16} width={100} />
              <Skeleton height={16} width={140} />
            </Group>
          ))}
        </Stack>
      ) : character ? (
        <Stack gap="md">
          <Image
            src={character.image}
            alt={character.name}
            radius="md"
            h={260}
            fit="contain"
          />

          <Group justify="center">
            <Badge color={STATUS_COLOR[character.status] ?? 'gray'} size="lg">
              {character.status}
            </Badge>
            <Badge variant="light" size="lg">
              {character.species}
            </Badge>
          </Group>

          <Divider />

          <Stack gap={6}>
            <DetailRow label="Género" value={character.gender} />
            <DetailRow label="Origen" value={character.origin.name} />
            <DetailRow label="Última ubicación" value={character.location.name} />
            <DetailRow label="Episodios" value={String(character.episode.length)} />
          </Stack>

          <Button
            fullWidth
            mt="md"
            variant={favorite ? 'filled' : 'outline'}
            color={favorite ? 'red' : 'yellow'}
            leftSection={<StarIcon weight={favorite ? 'fill' : 'regular'} size={18} />}
            onClick={() => toggleFavorite(character)}
          >
            {favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
          </Button>
        </Stack>
      ) : null}
    </Modal>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Group justify="space-between">
      <Text size="sm" c="dimmed">{label}</Text>
      <Text size="sm" fw={500}>{value}</Text>
    </Group>
  )
}

export default ModalDetail
