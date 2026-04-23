import { Card, Flex, SimpleGrid, Skeleton } from '@mantine/core'


function SkeletonCard() {
  return (
    <SimpleGrid cols={4}>
      {Array.from({ length: 8 }).map(() => (
        <Card>
          <Skeleton h={125} w={125} mb={"xs"} />
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