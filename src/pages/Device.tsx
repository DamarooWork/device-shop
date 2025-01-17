import { Button, Card, CardContent, IconButton } from '@mui/material'
import starIcon from '../assets/star.png'

export default function DevicePage() {
  const device: IDevice = {
    id: 1,
    name: 'Iphone 12 pro',
    price: 25000,
    rating: 1,
    img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
  }
  const description: IDescription[] = [
    {
      id: 1,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 2,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 3,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 4,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 5,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 6,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 7,
      title: 'Операвная память',
      description: '5 гб',
    },
    {
      id: 8,
      title: 'Операвная память',
      description: '5 гб',
    },
  ]

  return (
    <section className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="flex flex-col flex-[4]">
          <img
            className="rounded-3xl max-w-[300px] w-full h-auto"
            src={device.img}
            alt={device.name}
          />
        </div>
        <div className=" flex flex-col flex-[4]">
          <header className="flex flex-col w-full h-full text-4xl">
            <h2 className="mb-4 font-bold">{device.name}</h2>
            <div className="flex w-full h-full  relative items-center justify-center">
              <img
                className="w-[60%] h-[60%]  "
                src={starIcon}
                alt="Star icon"
              />
              <p
                className="text-black  text-6xl
            absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                {device.rating}
              </p>
            </div>
          </header>
        </div>
        <div className="flex flex-col flex-[4]">
          <Card className=" h-full  " variant="outlined">
            <CardContent className="h-full flex flex-col justify-around items-center">
              <h3 className="text-3xl">От {device.price} рублей</h3>
              <Button size="large" variant="outlined">
                Добавить в корзину
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-5xl mb-2">Характеристики</h2>
        {description.map((info, i) => {
          return (
            <div
              key={info.id}
              className={`flex
               gap-2 text-3xl p-4 rounded-xl ${
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
}
