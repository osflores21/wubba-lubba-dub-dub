import { MantineProvider } from '@mantine/core'
import { render as testingLibraryRender } from '@testing-library/react'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

export function render(ui: ReactNode) {
  return testingLibraryRender(
    <BrowserRouter>
      <MantineProvider defaultColorScheme="light">{ui}</MantineProvider>
    </BrowserRouter>,
  )
}
