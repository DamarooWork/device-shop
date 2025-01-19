import { useTheme } from '@mui/material/styles'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, InputAdornment } from '@mui/material'
import { TextField } from '@mui/material'
import { login, registration } from '../http/userAPI'
import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '../App'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default observer(function Auth() {
  const { user } = useContext(Context)
  const [showPassword, setShowPassword] = useState(true)
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const click = async (email: string, password: string) => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(true)
      user.setIsAuth(true)

      navigate(SHOP_ROUTE)
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      click(values.email, values.password)
    },
  })

  return (
    <main
      className="flex flex-col items-center 
    justify-center mt-[30vh] "
    >
      <h1 className="text-4xl mb-8">
        {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
      </h1>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'password' : 'text'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  position="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            },
          }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      <section className="flex  mt-4 text-lg gap-4 items-center">
        {isLogin ? (
          <>
            <p>Нет аккаунта?</p>
            <p
              onClick={() => navigate(REGISTRATION_ROUTE)}
              className="text-blue-400 cursor-pointer text-xl"
            >
              Создайте!
            </p>
          </>
        ) : (
          <>
            <p>Есть аккаунт?</p>
            <p
              onClick={() => navigate(LOGIN_ROUTE)}
              className="text-blue-400 cursor-pointer text-xl"
            >
              Войти!
            </p>
          </>
        )}
      </section>
    </main>
  )
})
