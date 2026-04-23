import { MantineProvider } from "@mantine/core"
import Home from "./pages/Home"

function App() {

  return (
    <MantineProvider defaultColorScheme={"light"}>
      <Home />
    </MantineProvider>
  )
}

export default App
