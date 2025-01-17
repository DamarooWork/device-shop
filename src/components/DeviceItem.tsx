import { Card, CardContent } from '@mui/material'
import starIcon from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
export default function DeviceItem({ device }: { device: IDevice }) {
  const navigate = useNavigate()

  return (
    <Card
      className="flex flex-col flex-wrap cursor-pointer"
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
      variant="outlined"
    >
      <CardContent>
        <img
          className="w-full max-h-40 object-contain mb-4"
          src={device.img}
          alt={device.name}
        />
        <footer className="text-gray-400 flex flex-row justify-between items-center">
          <h3>Sumsung....</h3>
          <div className="flex items-center gap-1">
            <img className="h-6 w-auto" src={starIcon} alt="Star icon" />
            <p>{device.rating}</p>
          </div>
        </footer>
        <h3>{device.name}</h3>
      </CardContent>
    </Card>
  )
}
