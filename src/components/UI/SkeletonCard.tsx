import { Card, Flex, SimpleGrid, Skeleton } from '@mantine/core'

function SkeletonCard() {
  return (
    <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4 }} spacing="md">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} shadow="sm" padding="md">
          <Skeleton h={125} w="100%" mb="xs" />
          <Flex gap={5}>
            <Skeleton h={20} w={100} />
            <Skeleton h={20} w={20} />
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default SkeletonCard
