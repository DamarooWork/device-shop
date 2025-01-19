import { Button, Modal } from '@mui/material'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'

export default function CreateDevice({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) {
  const { device } = useContext(Context)
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
  }, [])
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormAddDevice>({
    defaultValues: {
      info: [{ title: '', description: '' }],
    },
  })
  const onSubmit: SubmitHandler<IFormAddDevice> = (data) => {
    const formData = new FormData()
    formData.append('name', data.deviceName)
    formData.append('price', `${data.devicePrice}`)
    formData.append('img', data.img)
    formData.append('brandId', `${data.brand.id}`)
    formData.append('typeId', `${data.type.id}`)
    formData.append(
      'info',
      JSON.stringify(data.info.forEach((e, i) => (e.id = i++)))
    )
    console.log(formData)
    createDevice(formData)
      .then(() => reset())
      .then(() => close())
      .catch((e) => console.log(e))
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'info',
  })

  return (
    <Modal className="" open={open} onClose={close}>
      <section
        className=" text-white outline-1 mt-[50vh] ml-[50vw]
       translate-x-[-50%] translate-y-[-50%] bg-slate-300 dark:bg-slate-700 p-[20px] rounded-2xl"
      >
        <h2 className="text-center text-3xl mb-8">Добавить устройство</h2>
        <form
          className="flex flex-col gap-1 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            id="type"
          >
            Бренд устройства
          </label>
          <select
            className="mb-4 cursor-pointer bg-gray-50 border
             border-gray-300 text-gray-900 
             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            {...register('brand')}
          >
            {device.brands.map((brand: IBrand) => {
              return (
                <option
                  className="cursor-pointer"
                  key={brand.id}
                  value={brand.name}
                >
                  {brand.name}
                </option>
              )
            })}
          </select>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            id="brand"
          >
            Тип устройства
          </label>
          <select
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('type')}
          >
            {device.types.map((dev: IDevice) => {
              return (
                <option
                  className="cursor-pointer"
                  key={dev.id}
                  value={dev.name}
                >
                  {dev.name}
                </option>
              )
            })}
          </select>
          <label className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Название
          </label>
          <input
            type="text"
            className=" bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Название"
            {...register('deviceName', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.deviceName && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Введите название
            </p>
          )}
          <label className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Цена, р.
          </label>
          <input
            type="number"
            className=" bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Цена"
            {...register('devicePrice', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.devicePrice && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Введите цену
            </p>
          )}
          <label className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Фото
          </label>
          <input
            type="file"
            className=" mb-4 block w-full text-sm
             text-gray-900 border border-gray-300 rounded-lg cursor-pointer
              bg-gray-50 dark:text-gray-400 focus:outline-none
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            placeholder="Фото"
            {...register('img', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.img && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Добавьте фотографию
            </p>
          )}

          {fields.length ? (
            <label
              className=" block mb-2 text-sm
          font-medium text-gray-900 dark:text-white"
            >
              Свойства
            </label>
          ) : null}
          <ul className="flex flex-col gap-4 mb-4 ">
            {fields.map((item, index) => {
              return (
                <li className="flex flex-row gap-2" key={item.id}>
                  <input
                    type="text"
                    className="basis-1/3 bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введите название свойства"
                    {...register(`info.${index}.title`, { required: true })}
                  />

                  <input
                    type="text"
                    className="basis-1/3 bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введите описание свойства"
                    {...register(`info.${index}.description`)}
                  />

                  <Button
                    onClick={() => remove(index)}
                    className="basis-1/3"
                    style={{ padding: '8px' }}
                    variant="outlined"
                    color="error"
                  >
                    Удалить
                  </Button>
                </li>
              )
            })}
          </ul>
          <Button
            onClick={() => {
              append({ id: 1, title: '', description: '' })
            }}
            variant="outlined"
            color="success"
          >
            Добавить новое свойство
          </Button>
          <footer className="flex gap-4 justify-end mt-4">
            <Button variant="outlined" color="success" type="submit">
              Добавить
            </Button>
            <Button onClick={() => close()} variant="outlined" color="error">
              Закрыть
            </Button>
          </footer>
        </form>
      </section>
    </Modal>
  )
}
