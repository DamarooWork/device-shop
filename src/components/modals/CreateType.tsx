import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
export default function CreateType({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) {
  function handleClose() {
    console.log('type created!')
    close()
  }
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <Modal
      className=""
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Добавить тип
        </Typography>
        <Typography
          className="flex flex-col gap-5"
          id="modal-modal-description"
          onSubmit={formik.handleSubmit}
          component="form"
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="text"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}
