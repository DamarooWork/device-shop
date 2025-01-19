import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as ThemeProviderTailwind } from './hooks/ThemeContext.tsx'
import UserStore from './store/UserStore.tsx'
import DeviceStore from './store/DeviceStore.tsx'
export const Context = createContext<any>({})

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
          <Context.Provider
            value={{ user: new UserStore(), device: new DeviceStore() }}
          >
            <App />
          </Context.Provider>
        </ThemeProvider>
      </ThemeProviderTailwind>
    </BrowserRouter>
  </StrictMode>
)
