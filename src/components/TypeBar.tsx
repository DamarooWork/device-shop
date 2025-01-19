import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../main'

export default observer(function TypeBar() {
  const { device } = useContext(Context)

  return (
    <section className="motion-preset-blur-right  motion-duration-1000">
      <nav aria-label="secondary mailbox folders">
        <List className="">
          {device.types.map((type: IType) => {
            return (
              <ListItem
                className={`rounded-2xl 
                  ${type.id === device.selectedType.id ? 'dark:bg-gray-500 bg-gray-200' : ''}`}
                onClick={() => device.setSelectedType(type)}
                disablePadding
                key={type.id}
              >
                <ListItemButton>
                  <ListItemText primary={type.name} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </nav>
    </section>
  )
})
