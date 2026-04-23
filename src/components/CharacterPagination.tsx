import { Group, Button, Text } from '@mantine/core'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import type { IInfo } from '../types/api.type'

interface CharacterPaginationProps {
  info: IInfo | undefined
  page: number
  onPageChange: (page: number) => void
}

function CharacterPagination({ info, page, onPageChange }: CharacterPaginationProps) {
  if (!info) return null

  const hasPrev = info.prev !== null
  const hasNext = info.next !== null

  return (
    <Group justify="space-between" align="center" my="lg" wrap="wrap">
      <Text size="sm" c="dimmed">
        {info.count} personajes · página {page} de {info.pages}
      </Text>

      <Group gap="xs">
        <Button
          variant="default"
          leftSection={<CaretLeftIcon size={14} />}
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>

        <Button
          variant="default"
          rightSection={<CaretRightIcon size={14} />}
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </Button>
      </Group>
    </Group>
  )
}

export default CharacterPagination