import { MantineProvider } from '@mantine/core'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <AppRouter />
    </MantineProvider>
  )
}

export default App
