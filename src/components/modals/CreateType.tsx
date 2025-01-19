import { Button, Modal } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createType } from '../../http/deviceAPI'

export default function CreateType({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormAddType>()
  const onSubmit: SubmitHandler<IFormAddType> = (data) => {
    createType(data)
      .then(() => reset())
      .then(() => close())
      .then(() => alert('Новый тип "' + data.name + '" добавлен!'))
  }

  return (
    <Modal
      className="intersect:motion-preset-blur-down"
      open={open}
      onClose={close}
    >
      <section
        className="max-w-[700px] text-white outline-1 mt-[50vh] ml-[50vw]
       translate-x-[-50%] translate-y-[-50%] bg-slate-300 dark:bg-slate-700 p-[20px] rounded-2xl"
      >
        <h2
          className="text-center text-3xl mb-8 intersect-once intersect:motion-preset-blur-down 
            motion-delay-100"
        >
          Добавить тип
        </h2>
        <form
          className="flex flex-col gap-1 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className="block mb-2 text-sm font-medium text-gray-900 
            dark:text-white intersect-once intersect:motion-preset-blur-down 
            motion-delay-200"
            id="brand"
          >
            Название типа
          </label>
          <input
            type="text"
            className=" bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 intersect-once intersect:motion-preset-blur-down 
            motion-delay-200"
            placeholder="Название"
            {...register('name', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.name && (
            <p className=" text-sm font-medium text-red-600 dark:text-red-500">
              Введите название
            </p>
          )}

          <footer
            className="flex gap-4 justify-end mt-4 
          intersect-once intersect:motion-preset-blur-down 
            motion-delay-300"
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
