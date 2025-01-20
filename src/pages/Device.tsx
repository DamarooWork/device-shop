import { Button, Card, CardContent } from '@mui/material'
import starIcon from '../assets/star.png'
import { useEffect, useState } from 'react'
import { fetchDevice } from '../http/deviceAPI'
import { useParams } from 'react-router'
import { observer } from 'mobx-react-lite'

export default observer(function DevicePage() {
  let { id } = useParams()
  const [oneDevice, setOneDevice] = useState<IDevice>({
    id: 1,
    name: '',
    price: 0,
    rating: 0,
    img: '',
    info: [],
    brandId: 0,
    typeId: 0,
  })

  useEffect(() => {
    fetchDevice(id).then((data) => setOneDevice(data))
  }, [])

  return (
    <section className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="flex flex-col flex-[4] intersect-once intersect:motion-preset-blur-down">
          <img
            className="rounded-3xl max-w-[300px] w-full h-auto"
            src={import.meta.env.VITE_API_URL + oneDevice.img}
            alt={oneDevice.name}
          />
        </div>
        <div
          className=" flex flex-col flex-[4] intersect-once intersect:motion-preset-blur-down 
        motion-delay-[100ms]"
        >
          <header className="flex flex-col w-full h-full ">
            <div className=" text-2xl  text-center">
              <h2 className="font-bold text-4xl">{oneDevice.name}</h2>
            </div>

            <div className="flex w-full h-full  relative items-center justify-center">
              <img
                className="w-[60%] h-auto  "
                src={starIcon}
                alt="Star icon"
              />
              <p
                className="text-black  text-6xl
          absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                {oneDevice.rating}
              </p>
            </div>
          </header>
        </div>
        <div
          className="flex flex-col flex-[4] intersect-once intersect:motion-preset-blur-down 
        motion-delay-200"
        >
          <Card className=" h-full  " variant="outlined">
            <CardContent className="h-full flex flex-col justify-around items-center">
              <h3 className="text-3xl">От {oneDevice.price} рублей</h3>
              <Button size="large" variant="outlined">
                Добавить в корзину
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-10 ">
        <h2
          className="text-5xl mb-2 intersect-once intersect:motion-preset-blur-down 
        motion-delay-300"
        >
          Характеристики
        </h2>
        {oneDevice.info.length === 0 ? (
          <p
            //@ts-ignore
            style={{ '--motion-delay': `300ms` }}
            className="text-red-900 dark:text-red-500 text-2xl intersect-once intersect:motion-preset-blur-down "
          >
            Нет характеристик
          </p>
        ) : null}
        {oneDevice.info.map((info, i) => {
          return (
            <div
              //@ts-ignore
              style={{ '--motion-delay': `${i + 3}00ms` }}
              key={info.id}
              className={`flex
             gap-2 text-3xl p-4 rounded-xl intersect-once intersect:motion-preset-blur-down ${
               i % 2 === 0
                 ? 'bg-gray-300 dark:bg-gray-800'
                 : 'bg-gray-100 dark:bg-gray-900'
             }`}
            >
              <p>
                {info.title}: {info.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
})
