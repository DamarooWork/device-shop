import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'

import { useContext, useEffect, useState } from 'react'
import { CircularProgress, Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI.tsx'
import { Context } from './main.tsx'

export default observer(function App() {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data)
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
   
    <Container>
      <NavBar />
      <AppRouter />
    </Container>
  )
})
