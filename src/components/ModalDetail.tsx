import { useEffect } from 'react'
import { Modal, Image, Text, Badge, Group, Stack, Divider, Skeleton } from '@mantine/core'
import { useSingleCharacter } from '../hooks/useServices'

interface ModalDetailProps {
  id: number | null
  opened: boolean
  onClose: () => void
}

const STATUS_COLOR: Record<string, string> = {
  Alive: 'teal',
  Dead: 'red',
  unknown: 'gray',
}

function ModalDetail({ id, opened, onClose }: ModalDetailProps) {
  const { character, singleCharacter, loading } = useSingleCharacter(id ?? 0)

  useEffect(() => {
    if (opened && id !== null) {
      singleCharacter()
    }
  }, [opened, id])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={character?.name ?? ''}
      centered
      size="sm"
      styles={{ title: { fontWeight: 600 } }}
    >
      {loading ? (
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