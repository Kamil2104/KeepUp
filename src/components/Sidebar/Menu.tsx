import React from 'react'

import Option from './Option'

import { SidebarOption, MenuProps } from '../../interfaces/SidebarInterfaces'

const Menu: React.FC<MenuProps> = React.memo(({ data }) => {
  return (
    <div className='flex flex-col gap-2 h-auto w-full'>
        {data.map((obj: SidebarOption) => (
            <Option
                key={obj.name}
                icon={obj.icon}
                name={obj.name}
                isActive={obj.isActive}
                onClick={obj.onClick}
            />
        ))}
    </div>
  )
})

export default Menu