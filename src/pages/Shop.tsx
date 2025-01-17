import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'

export default function Shop() {
  return (
    <>
      <main className="flex gap-5 ">
        <section className="flex-1">
          <TypeBar />
        </section>
        <section className="flex-[3]">
          <BrandBar />
          <DeviceList />
        </section>
      </main>
    </>
  )
}
