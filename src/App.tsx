import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import UserStore from './store/UserStore.tsx'
import DeviceStore from './store/DeviceStore.tsx'
import { createContext, useContext, useEffect, useState } from 'react'
import { CircularProgress, Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI.tsx'
export const Context = createContext<any>({})
export default observer(function App() {
  const { user } = useContext(Context)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    check()
      .then(() => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <CircularProgress className="text-center ml-[50vw]" color="inherit" />
    )
  }
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
})
