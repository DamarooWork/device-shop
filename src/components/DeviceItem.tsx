import { Card, CardContent } from '@mui/material'
import starIcon from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
export default function DeviceItem({ device }: { device: IDevice }) {
  const navigate = useNavigate()

  return (
    <Card
      style={{ transitionProperty: 'all', transitionDuration: '400ms' }}
      className="flex flex-col flex-wrap cursor-pointer group
       "
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
      variant="outlined"
    >
      <CardContent className="will-change-transform duration-300 ease-in-out group-hover:scale-105">
        <img
          className="w-full h-auto object-contain mb-4 rounded-xl  "
          src={import.meta.env.VITE_API_URL + device.img}
          alt={device.name}
        />
        <p className="text-xl text-gray-400 dark:text-gray-300 ">
          {device.price} р.
        </p>
        <footer className=" flex flex-row justify-between items-center">
          <h3 className="text-lg font-semibold">{device.name}</h3>
          <div className="flex items-center gap-1 ">
            <img className="h-6 w-6" src={starIcon} alt="Star icon" />
            <p>{device.rating}</p>
          </div>
        </footer>
      </CardContent>
    </Card>
  )
}
