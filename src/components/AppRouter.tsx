import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { adminRoutes, authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '../main'

export default function AppRouter() {
  const { user } = useContext(Context)
  useEffect(() => {}, [user])
  return (
    <Routes>
      {user.isAuth
        ? authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} />
          ))
        : null}
      {localStorage.role === 'ADMIN'
        ? adminRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} />
          ))
        : null}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} />
      ))}
      <Route path="*" element={<Navigate replace to={SHOP_ROUTE} />} />
    </Routes>
  )
}
