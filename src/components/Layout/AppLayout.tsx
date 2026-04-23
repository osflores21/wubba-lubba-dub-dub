import { AppShell, Container, Flex, Text } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <AppShell header={{ height: 110 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Flex justify="center" direction="column" w="100%" h="100%" gap="xs">
            <Text ta="center" fw={600} fz="h1">Wubba Lubba dub dub</Text>
            <Text ta="center" fw={600} fz="lg">Base de datos de personajes de Rick y Morty</Text>
          </Flex>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
