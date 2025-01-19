import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as ThemeProviderTailwind } from './hooks/ThemeContext.tsx'
import UserStore from './store/UserStore.tsx'
import DeviceStore from './store/DeviceStore.tsx'
import ObserverProvider from './plugins/ObserverProvider.tsx'
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
let container = null
if (!container) {
  container = createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Context.Provider
        value={{ user: new UserStore(), device: new DeviceStore() }}
      >
        <BrowserRouter>
          <ThemeProviderTailwind>
            <ThemeProvider theme={theme}>
              <ObserverProvider>
                <App />
              </ObserverProvider>
            </ThemeProvider>
          </ThemeProviderTailwind>
        </BrowserRouter>
      </Context.Provider>
    </StrictMode>
  )
}
