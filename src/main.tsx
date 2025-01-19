import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as ThemeProviderTailwind } from './hooks/ThemeContext.tsx'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
})
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderTailwind>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ThemeProviderTailwind>
    </BrowserRouter>
  </StrictMode>
)
