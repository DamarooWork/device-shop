import { Modal } from '@mui/material'
import { Field, Formik, useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'
import { Context } from '../../App'

export default function CreateDevice({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) {
  const { device } = useContext(Context)
  function handleClose() {
    console.log('type created!')
    close()
  }
  const formik = useFormik({
    initialValues: {
      type: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <Modal className="" open={open} onClose={handleClose}>
      <section
        style={{
          width: 400,
          color: 'white',
          outline: 0,
          marginTop: '50vh',
          marginLeft: '50vw',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1f2937',
          padding: '20px',
          borderRadius: '20px',
        }}
      >
        <h2>Добавить тип</h2>
        <Formik
          initialValues={{
            type: '', // added for our select
          }}
          validationSchema={Yup.object({
            type: Yup.string().required('Required'),
          })}
          onSubmit={(values: any, { setSubmitting }: any) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Field
              label="type"
              name="type"
              as="select"
              className="my-select text-black"
            >
              {device.types.map((dev: IDevice) => {
                return (
                  <option className="text-black" key={dev.id} value={dev.name}>
                    {dev.name}
                  </option>
                )
              })}
            </Field>

            <button type="submit">Submit</button>
          </form>
        </Formik>
      </section>
    </Modal>
  )
}
