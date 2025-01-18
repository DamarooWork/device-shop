import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../App'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pages from '../components/Pages'

export default observer(function Shop() {
  const { device } = useContext(Context)
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
  }, [])
  useEffect(() => {
    device.setLimit(2)
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])
  return (
    <>
      <main className="flex gap-5 ">
        <section className="flex-1">
          <TypeBar />
        </section>
        <section className="flex-[3]">
          <BrandBar />
          <DeviceList />
          {device.totalCount ? <Pages /> : null}
        </section>
      </main>
    </>
  )
})
