type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined
type Children = {
  children: ReactNode
}
interface IType {
  id: number
  name: string
}
interface IBrand {
  id: number
  name: string
}
interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
}
