import { Button } from '@mui/material'

export default function Admin() {
  return (
    <main
      className="flex   flex-col items-center 
    justify-center gap-5 mt-[30vh]"
    >
      <Button size="large" variant="outlined">
        Добавить тип
      </Button>
      <Button size="large" variant="outlined">
        Добавить бренд
      </Button>
      <Button size="large" variant="outlined">
        Добавить устройство
      </Button>
    </main>
  )
}
