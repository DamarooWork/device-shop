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
    formData.append('img', data.img[0])
    formData.append('brandId', `${data.brand}`)
    formData.append('typeId', `${data.type}`)
    formData.append('info', JSON.stringify(data.info))
    createDevice(formData)
      .then(() => reset())
      .then(() => close())
      .then(() => alert(data.deviceName + ' добавлен!'))
      .catch((e) => console.log(e.message))
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'info',
  })

  return (
    <Modal
      className="intersect:motion-preset-blur-down"
      open={open}
      onClose={close}
    >
      <section
        className=" text-white outline-1 mt-[50vh] ml-[50vw]
       translate-x-[-50%] translate-y-[-50%]
       max-w-[700px]
        bg-slate-300 dark:bg-slate-700 p-[20px]
         rounded-2xl  max-h-[90vh] scrollbar-thumb-rounded-full scrollbar-track-rounded-full
        scrollbar scrollbar-thumb-slate-500
         scrollbar-track-slate-300 overflow-y-auto "
      >
        <h2
          className="text-center text-3xl mb-8 intersect-once intersect:motion-preset-blur-down 
            motion-delay-100"
        >
          Добавить устройство
        </h2>
        <form
          className="flex flex-col gap-1 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white intersect-once intersect:motion-preset-blur-down 
            motion-delay-200"
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
            dark:focus:ring-blue-500 dark:focus:border-blue-500 intersect-once intersect:motion-preset-blur-down 
            motion-delay-200"
            {...register('brand')}
          >
            {device.brands.map((brand: IBrand) => {
              return (
                <option
                  className="cursor-pointer"
                  key={brand.id}
                  value={brand.id}
                >
                  {brand.name}
                </option>
              )
            })}
          </select>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 
            dark:text-white intersect-once intersect:motion-preset-blur-down 
            motion-delay-300"
            id="brand"
          >
            Тип устройства
          </label>
          <select
            className="cursor-pointer bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500 intersect-once intersect:motion-preset-blur-down 
            motion-delay-300"
            {...register('type')}
          >
            {device.types.map((dev: IDevice) => {
              return (
                <option className="cursor-pointer" key={dev.id} value={dev.id}>
                  {dev.name}
                </option>
              )
            })}
          </select>
          <label
            className="mt-4 block mb-2 text-sm font-medium
           text-gray-900 dark:text-white intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `400ms` }}
          >
            Название
          </label>
          <input
            type="text"
            className=" bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `400ms` }}
            placeholder="Название"
            {...register('deviceName', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.deviceName && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Введите название
            </p>
          )}
          <label
            className="mt-4 block mb-2 text-sm font-medium
           text-gray-900 dark:text-white  intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `500ms` }}
          >
            Цена, р.
          </label>
          <input
            type="number"
            className=" bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `500ms` }}
            placeholder="Цена"
            {...register('devicePrice', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.devicePrice && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Введите цену
            </p>
          )}
          <label
            className="mt-4 block mb-2 text-sm font-medium
           text-gray-900 dark:text-white  intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `600ms` }}
          >
            Фото
          </label>
          <input
            type="file"
            className=" mb-4 block w-full text-sm
             text-gray-900 border border-gray-300 rounded-lg cursor-pointer
              bg-gray-50 dark:text-gray-400 focus:outline-none
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400  intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `600ms` }}
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
          font-medium text-gray-900 dark:text-white  intersect-once 
          intersect:motion-preset-blur-down 
            "
              //@ts-ignore
              style={{ '--motion-delay': `700ms` }}
            >
              Свойства
            </label>
          ) : null}
          <ul
            className="flex flex-col gap-4 mb-4 
           max-h-[200px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full
           scrollbar scrollbar-thumb-slate-500
            scrollbar-track-slate-300 overflow-y-auto intersect-once 
          intersect:motion-preset-blur-down 
            "
            //@ts-ignore
            style={{ '--motion-delay': `700ms` }}
          >
            {fields.map((item, index) => {
              return (
                <li
                  className="flex flex-row gap-4  intersect-once 
          intersect:motion-preset-blur-down 
            "
                  key={item.id}
                >
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
            className="intersect-once 
          intersect:motion-preset-blur-down"
            //@ts-ignore
            style={{ '--motion-delay': `800ms` }}
            onClick={() => {
              append({ id: 1, title: '', description: '' })
            }}
            variant="outlined"
            color="success"
          >
            Добавить новое свойство
          </Button>
          <footer
            className="flex gap-4 justify-end mt-4 intersect-once 
          intersect:motion-preset-blur-down"
            //@ts-ignore
            style={{ '--motion-delay': `900ms` }}
          >
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
