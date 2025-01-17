import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../App'

export default observer(function DeviceList() {
  const { device } = useContext(Context)
  return (
    <section className="flex">
      {device.devices.map(() => {
        return 123
      })}
    </section>
  )
})
