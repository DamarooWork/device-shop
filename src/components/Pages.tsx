import { useContext } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import {
  Pagination,
  PaginationRenderItemParams,
} from '@mui/material'

export default observer(function Pages() {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)

  const handleChange = (event: PaginationRenderItemParams, page: number) => {
    device.setPage(page)
  }
  return (
    <Pagination
      className="flex justify-center items-center mt-12"
      count={pageCount}
      page={device.page}
      //@ts-ignore
      onChange={handleChange}
      color="primary"
    />
  )
})
