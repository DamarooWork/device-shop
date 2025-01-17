import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../App'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default observer(function BrandBar() {
  const { device } = useContext(Context)

  return (
    <section className="flex items-center justify-center  flex-wrap gap-4 mb-12">
      {device.brands.map((brand: IBrand) => {
        return (
          <Card
            className="flex-1 basis-1/6 text-center "
            key={brand.id}
            variant="outlined"
            onClick={() => device.setSelectedBrand(brand)}
          >
            <CardContent
              className={` cursor-pointer 
              ${
                brand.id === device.selectedBrand.id
                  ? 'dark:bg-gray-500 bg-gray-200 '
                  : ''
              }`}
            >
              {brand.name}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
})
