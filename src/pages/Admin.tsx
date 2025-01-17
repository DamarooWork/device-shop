import { Button } from '@mui/material'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import { useState } from 'react'

export default function Admin() {
  const [isModalCreateBrandOpen, setModalCreateBrandOpen] =
    useState<boolean>(false)
  const [isModalCreateDeviceOpen, setModalCreateDeviceOpen] =
    useState<boolean>(false)
  const [isModalCreateTypeOpen, setModalCreateTypeOpen] =
    useState<boolean>(false)
  return (
    <main className="relative">
      <CreateBrand
        open={isModalCreateBrandOpen}
        close={() => setModalCreateBrandOpen(false)}
      />
      <CreateDevice
        open={isModalCreateDeviceOpen}
        close={() => setModalCreateDeviceOpen(false)}
      />
      <CreateType
        open={isModalCreateTypeOpen}
        close={() => setModalCreateTypeOpen(false)}
      />
      <section
        className="flex   flex-col items-center 
    justify-center gap-5 mt-[30vh]"
      >
        <Button
          size="large"
          variant="outlined"
          onClick={() => setModalCreateTypeOpen(true)}
        >
          Добавить тип
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={() => setModalCreateBrandOpen(true)}
        >
          Добавить бренд
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={() => setModalCreateDeviceOpen(true)}
        >
          Добавить устройство
        </Button>
      </section>
    </main>
  )
}
