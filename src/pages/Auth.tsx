import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { login, registration } from '../http/userAPI'
import { useLocation } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const click = async (email: string, password: string) => {
    console.log(email, password)

    if (isLogin) {
      const response = await login(email, password)
    } else {
      const response = await registration(email, password)
      console.log(response)
    }
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
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
      <h1>Signup</h1>
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
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </main>
  )
}
