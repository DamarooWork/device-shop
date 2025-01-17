import { Container } from '@mui/material'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'

export default function Shop() {
  return (
    <>
      <section className="flex gap-5 ">
        <div className="flex-1">
          <TypeBar />
        </div>
        <div className="flex-[3]">
          <BrandBar />
        </div>
      </section>
    </>
  )
}
