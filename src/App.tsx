import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import UserStore from './store/UserStore.tsx'
import DeviceStore from './store/DeviceStore.tsx'
import { createContext } from 'react'
import { Container } from '@mui/material'
export const Context = createContext<any>({})
export default function App() {
  return (
    <>
      <Context.Provider
        value={{ user: new UserStore(), device: new DeviceStore() }}
      >
         <Container>
        <NavBar />
        <AppRouter />
        </Container>
      </Context.Provider>
    </>
  )
}
