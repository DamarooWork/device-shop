import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../App'
import DeviceItem from './DeviceItem'

export default observer(function DeviceList() {
  const { device } = useContext(Context)
  return (
    <section className="grid grid-flow-row grid-cols-4 gap-5">
      {device.devices.map((dev: IDevice) => {
        return <DeviceItem key={device.id} device={dev} />
      })}
    </section>
  )
})
