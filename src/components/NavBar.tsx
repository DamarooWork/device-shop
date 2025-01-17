import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Context } from '../App'
import { Container, useColorScheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { ThemeContext } from '../hooks/ThemeContext'
export default observer(function NavBar() {
  const { mode, setMode } = useColorScheme()
  const { user } = useContext(Context)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  function handleThemeBtnClick() {
    mode === 'dark' ? setMode('light') : setMode('dark')
    if (theme === 'dark') {
      localStorage.theme = 'light'
    } else {
      localStorage.theme = 'dark'
    }
    toggleTheme()
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to={SHOP_ROUTE}>DeviceShop</NavLink>
            </Typography>

            <Button onClick={() => handleThemeBtnClick()} color="inherit">
              Theme
            </Button>
            <nav>
              {user.isAuth ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate(`${ADMIN_ROUTE}`)}
                  >
                    Админ панель
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate(`${LOGIN_ROUTE}`)}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Button color="inherit" onClick={() => user.setIsAuth(true)}>
                  Авторизация
                </Button>
              )}
            </nav>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
})
